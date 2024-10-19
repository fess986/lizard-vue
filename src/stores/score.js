import { defineStore } from "pinia";

const baseScore = 25;

// сколько очков нужно для перехода на следущую сложность с текущей
const levels = new Array(15).fill(0).map((_, i) => baseScore * Math.pow(2, i));

// сколько очков нужно набрать для очередной сложности
const levelScores = levels.map((_, levelIndex) => {
	let sum = 0;

	for (let [index, value] of levels.entries()) {
		if (index >= levelIndex) {
			return sum + value;
		}

		sum += value;
	}
	return sum;
});

const getLevel = (score) => {
	for (let [index, value] of levelScores.entries()) {
		if (score <= value) {
			return {
				level: index,
				value: levels[index],
			};
		}
	}
};

export const useScoreStore = defineStore("score", {
	state: () => ({
		totalScore: 1,
	}),
	getters: {
		getTotalScore: (state) => state.totalScore, // всего очков
		currentLevel: (state) => getLevel(state.totalScore), // получить текущий уровень
		currentScore: (state) => {
			// текущее количество очков в прогрессе
			if (state.currentLevel.level === 0) {
				return state.totalScore;
			}
			return state.totalScore - levelScores[state.currentLevel.level - 1];
		},
	},
	actions: {
		// для добавления очков
		addScore(score = 1) {
			this.totalScore += score;
		},
		setScore(score) {
			this.totalScore = score;
		},
	},
});
