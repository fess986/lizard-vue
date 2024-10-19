<template>
  <div class="game-container">
    <ScoreProgress />
    <div class="header">
      <img src="../assets/coin.png" alt="coin" />
      <h2 class="score" id="score">{{ store.totalScore }}</h2>
    </div>
    <div class="circle">
      <img @click="increment" ref="img" id="circle" :src="imgSrc" />  
      <!-- использование биндинга для динамического определения свойства -->
    </div>
  </div>
</template>

<!-- script setup - говорит вью о том что мы будем работать с методами, подготавливающими данные для компонента для отображения -->
<script setup>
import { ref, computed } from 'vue'
import ScoreProgress from '@/components/ScoreProgress.vue'
import { useScoreStore } from '@/stores/score'
import frog from '@/assets/frog.png'
import lizard from '@/assets/lizzard.png'

const store = useScoreStore();

const img = ref(null)
const imgSrc = computed(() => store.totalScore < 25 ? frog : lizard)

function increment(event) {
  store.addScore(1)
  const rect = event.target.getBoundingClientRect()

  const offfsetX = event.clientX - rect.left - rect.width / 2
  const offfsetY = event.clientY - rect.top - rect.height / 2

  const DEG = 40

  const tiltX = (offfsetY / rect.height) * DEG
  const tiltY = (offfsetX / rect.width) * -DEG

  img.value.style.setProperty('--tiltX', `${tiltX}deg`)
  img.value.style.setProperty('--tiltY', `${tiltY}deg`)

  setTimeout(() => {
    img.value.style.setProperty('--tiltX', `0deg`)
    img.value.style.setProperty('--tiltY', `0deg`)
  }, 300)

  const plusOne = document.createElement('div')
  plusOne.classList.add('plus-one')
  plusOne.textContent = '+1'
  plusOne.style.left = `${event.clientX - rect.left}px`
  plusOne.style.top = `${event.clientY - rect.top}px`

  img.value.parentElement.appendChild(plusOne)

  setTimeout(() => plusOne.remove(), 2000)
}
</script>
