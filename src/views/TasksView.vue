<template>
  <div class="text-content">
    <h1>Your tasks</h1>
    <h3 v-if="!app.tasks.length">Loading tasks...</h3>
    <ul class="list">
      <li class="list-item" v-for="task in app.tasks" :key="task.id">
        {{ task.title }}
        <span>
          <a @click.prevent="openTask(task)" target="_blank" class="list-btn" :class="{ done: app?.user?.tasks?.[task.id] }"> {{ task.amount }} </a>
        </span>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/app';
import { completeTask } from '@/api.js/app';
import { useTelegram } from '@/services/telegram';

const app = useAppStore()
const { tg } = useTelegram();


onMounted(() => {
  // supabase.from('tasks').select('*')  // получаем из таблицы tasks все данные
  //   .then((data) => {  // так как получаем промис, то обработаем его с помощью then
  //     console.log(data.data)  // в data объект с данными в поле data и другими данными о статусе и ошибке
  //   })

  app.getTasks()
})

function openTask(task) {
  completeTask(task)

  if (task.url.includes('t.me')) {
    tg.openTelegramLink(task.url)  // специальный метод для открытия телеграм-ссылки
  } else {
    tg.openLink(task.url)  // обычный метод для открытия в браузере
  }
}
</script>