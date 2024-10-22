<template>
  <div class="text-content">
    <h1>Your Friends</h1>

    <div class="center">
      <button class="referal" @click="copy">{{ referalText }}</button>
    </div>

    <h3 v-if="!friends.length">No friends yet</h3>

    <ul class="list">
      <li class="list-item" v-for="friend in friends" :key="friend.id">
        {{ friend.name }}
        <span class="list-btn done">50</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useTelegram } from '@/services/telegram';
import { useAppStore } from '@/stores/app';

const app = useAppStore();
const { user } = useTelegram();

const currentUserId = user?.id ?? 4252;
const friends = computed(() => Object.keys(app.user.friends).map((id) => ({
  id,
  name: app.user.friends[id],
})));

const referalText = ref('Your referal');

function copy() {
  navigator.clipboard.writeText(`https://lizard-clicker-vue.web.app?ref=${currentUserId}`);
  referalText.value = 'Copied!';
}

</script>