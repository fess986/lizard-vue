export const useTelegram = () => {
  const tg = window.Telegram.WebApp;  // получаем объект Telegram, который мы добавили через скрипт в index.html
  return {
    tg,
    user: tg.initDataUnsafe?.user,  // данные пользователя телеграмма
  }
}