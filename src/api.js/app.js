import supabase from "@/services/superbase";
import { useTelegram } from "@/services/telegram";
import { useScoreStore } from "@/stores/score";

const { user } = useTelegram();

const MY_ID = user?.id ?? 4252; // так как в браузере нет id телеграмма, берём значение по умалчанию для него

export async function getTasks() {
	try {
		const { data } = await supabase.from("tasks").select("*");
		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function getOrCreateUser() {
	try {
		const { data, error } = await supabase // error обязаны  выгружать, иначе ошибка не обработается в блоке catch, такова механика работы supabase
			.from("user")
			.select() // выбираем поля
			.eq("telegramId", MY_ID); // у которых telegram-id равен MY_ID

		// есди ошибка в запросе, то пишем её и пробрасываем дальше или как то обрабатываем
		if (error) {
			console.log("ошибка получения пользователя - ", error);
			throw error; // просто можно выбросить ошибку
		}

		// если ошибки не было, и пользователь существует, то возвращаем его данные
		if (data?.length !== 0) {
			return data[0];
		}
	} catch (error) {
		console.log("ошибка получения пользователя22 - ", error); // тут уже получаем ошибку, если бы не было блока "if (error) {", то мы бы сюда не попали
	}

	// если пользователь не существует, то создаем его
	const newUser = {
		telegramId: MY_ID,
		friends: {},
		tasks: {},
		score: 0,
	};

	// тут возможную ошибку не обрабатываем
	await supabase.from("user").insert(newUser); // вставляем строку в таблицу users с новым пользователем

	// записываем в базу нового пользователя и возвращаем его данные
	return newUser;
}

export async function updateScore(score) {
	const { data } = await supabase
		.from("user") // в бд в таблице users
		.update({ score }) // обновляем поле score
		.eq("telegramId", MY_ID); // у которого telegram-id равен MY_ID
}

export async function registerRef(refName, refId) {
	const { data } = await supabase
		.from("user")
		.select()
		.eq("telegramId", +refId);

	const refUser = data[0]; // получаем данные пользователя нажавшего реферальную ссылку

	await supabase
		.from("user")
		.update(
			{
				friends: { ...refUser.friends, [MY_ID]: refName },
				score: refUser.score + 50,
			} // обновляем поле friends в таблице users
		)
		.eq("telegramId", +refId); // у которого telegram-id равен refId

	console.log("ass");
}

// принимаем объект пользователя и объект задачи из бд
export async function completeTask(task) {
	const score = useScoreStore();
	const newScore = score.totalScore + task.amount;

	const { data } = await supabase
		.from("user")
		.update({
			tasks: { ...user.tasks, [task.id]: true }, // обновляем поле tasks в таблице users
			score: newScore, // обновляем поле tasks в таблице users
		})
		.eq("telegramId", MY_ID);
}
