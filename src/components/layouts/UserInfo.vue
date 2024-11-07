<script setup lang="ts">
import { useSessionStore } from '@/stores/session'

defineProps({
  isMinimized: Boolean
})
const session = useSessionStore()
</script>

<template>
  <div class="flex items-center p-4 space-x-2">
    <div class="avatar">
      <div class="w-8 rounded-full">
        <img
          :src="
            session.user?.avatar ??
            `https://ui-avatars.com/api/?name=${session.user?.name}`
          "
          alt="User Avatar"
        />
      </div>
    </div>
    <div v-if="!isMinimized">
      <h2 class="text-sm whitespace-nowrap font-semibold">
        {{ session.user?.name }}
      </h2>
      <p v-if="session.user?.roles" class="text-xs whitespace-nowrap">
        {{ session.user?.roles[0] }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
