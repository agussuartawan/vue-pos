<script setup lang="ts">
import errorImg from '@/assets/img/internal-server-error.svg'

defineProps({
  error: String
})

const emit = defineEmits(['action'])
const action = () => {
  emit('action')
}
</script>

<template>
  <div class="flex flex-col gap-y-3 items-center justify-center">
    <img :src="errorImg" alt="Error Image" class="h-96 w-full" />
    <h1 class="text-2xl font-bold">{{ error ?? 'Internal Server Error' }}</h1>
    <button @click="action" class="btn btn-sm btn-primary">Try Again</button>
  </div>
</template>

<style scoped></style>
