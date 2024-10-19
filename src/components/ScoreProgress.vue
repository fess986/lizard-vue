<template>
  <div class="progress">
    <h4 class="progress-level">
      <span> {{ store.currentScore }} / {{ store.currentLevel.value }}</span>
      <span>{{ store.currentLevel.level + 1 }}</span>
    </h4>
    <div class="progress-container">
      <div class="progress-value" :style="{width: progressValue + '%'}"></div>
    </div>
  </div>
</template>

<script setup>
import { useScoreStore } from '@/stores/score';
import { computed } from 'vue';

const store = useScoreStore();
const progressValue = computed(() => store.currentScore / store.currentLevel.value * 100)

</script>