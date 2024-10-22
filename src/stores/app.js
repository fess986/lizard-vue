import { defineStore } from "pinia";
import { getOrCreateUser, registerRef, getTasks } from "@/api.js/app";
import { useScoreStore } from "./score";
import { useTelegram } from "@/services/telegram";

// const { user } = useTelegram(); // текущий пользователь в webApp телеги
// user.first_name = 'ass'

// временный пользователь
const user = {
  first_name: 'ass'
}

export const useAppStore = defineStore("app", {
	state: () => ({
		user: {},
		tasks: [],
	}),
	actions: {
		async init(ref) {
			this.user = await getOrCreateUser(); // получаем данные пользователя при инициализации
			// console.log(this.user);

			const score = useScoreStore();
			score.totalScore = this.user.score;

			// user.first_name = 'ass'

      // тут не хватает проверки, а есть ли пользователь в бд
			if (ref && +ref !== this.user.telegramId) {
				await registerRef(user.first_name, ref);
			}
		},
		async completeTask() {
			await completeTask(task);
		},
    async getTasks() {
      this.tasks = await getTasks();
    },

	},
});
