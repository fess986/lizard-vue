import { defineStore } from "pinia";
import { getOrCreateUser } from "@/api.js/app";

export const useAppStore = defineStore("app", {
  state: () => ({
    user: {},
    tasks: [],
  }),
  actions: {
    async init() {
      this.user = await getOrCreateUser();  // получаем данные пользователя при инициализации
      console.log(this.user);
    }
  },
});