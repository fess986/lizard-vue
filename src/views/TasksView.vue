<template>
  <div class="text-content">
    <h1>Your tasks</h1>
    <h3>Loading tasks...</h3>
    <ul class="list">
      <li class="list-item">
        Subscribe to telegram

        <span>
          <a target="_blank" class="list-btn"> 50 </a>
        </span>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { onMounted } from 'vue'
import supabase from '@/services/superbase';

onMounted(() => {
  supabase.from('tasks').select('*')  // получаем из таблицы tasks все данные
    .then((data) => {  // так как получаем промис, то обработаем его с помощью then
      console.log(data.data)  // в data объект с данными в поле data и другими данными о статусе и ошибке
    })
})
</script>