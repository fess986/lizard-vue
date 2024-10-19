// // бот для реферальных ссылок - то есть приглашения к игре друзей

// import { Telegraf, Markup } from "telegraf";

// const token = "7986265264:AAGWnGyhLD46LUTfsdz7ONVtzqd9nifL7Zg";
// const webAppUrl = "https://lizard-clicker-vue.web.app"; // это ссылка на запущенный задеплоенное приложение на firebase google

// const bot = new Telegraf(token);

// bot.command("start", (ctx) => {

// 	ctx.reply(
// 		"Нажмите чтобы присоединиться к игре",
// 		Markup.inlineKeyboard([
// 			Markup.button.webApp(
// 				"Ссылка на приложение",
// 				`${webAppUrl}?ref=${ctx.payload}`
// 			),
// 		])
// 	);
// });

// bot.launch();

import { Telegraf, Markup } from "telegraf";

const token = "7986265264:AAGWnGyhLD46LUTfsdz7ONVtzqd9nifL7Zg";
const webAppUrl = "https://lizard-clicker-vue.web.app"; // Ссылка на ваше приложение для мобильных
const desktopUrl = "https://lizard-clicker-vue.web.app"; // Ссылка для десктопа (та же ссылка, но открываем в браузере)

const bot = new Telegraf(token);

bot.command("start", (ctx) => {
  ctx.reply(
    // "Выберите способ открытия приложения:",
    `${webAppUrl}?ref=${ctx.payload}`,
    Markup.inlineKeyboard([
      // Кнопка для мобильного WebApp
      Markup.button.webApp("Мобильная версия", `${webAppUrl}?ref=${ctx.payload}`),
      // Кнопка для открытия в браузере на десктопе
      Markup.button.url("Десктоп версия (в браузере)", `${desktopUrl}?ref=${ctx.payload}`)
    ])
  );
});

bot.launch();
