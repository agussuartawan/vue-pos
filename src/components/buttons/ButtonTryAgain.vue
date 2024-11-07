<script setup lang="ts">
defineProps({
  error: String
})
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <span class="text-lg font-semibold">
      {{ error || 'Internal Server Error' }}
    </span>
    <button class="btn btn-sm btn-primary">Try Again</button>
  </div>
</template>

<style scoped></style>
