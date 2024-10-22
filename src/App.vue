<template>
  <main class="game" v-if="appLoaded">
    <div class="page">
      <RouterView />
    </div>
    <TheMenu />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import TheMenu from './components/TheMenu.vue'
import { onMounted, ref } from 'vue';
import { useAppStore } from './stores/app';
import { useTelegram } from './services/telegram';

const { tg } = useTelegram();
const app = useAppStore();
const appLoaded = ref(false);  // переменная для понимания загружены ли данные

const urlParams = new URLSearchParams(window.location.search);  // при помощи этого объекта получим данные из url и кинем их в метод init
console.log(urlParams.get('ref'));

app.init(urlParams.get('ref')).then(() => appLoaded.value = true);  // после успешной инициализации, получения пользователя и добавления его в бд - устанавливаем флаг в true

onMounted(() => {
  tg.ready(); // сигнализируем телеграму о том что вёрстка готова

  tg.expand(); // развернуть весь экран приложение телеграмм
})

</script>
