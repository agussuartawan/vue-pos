<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  description: String
})
</script>

<template>
  <div class="flex">
    <div class="flex-grow">
      <h1 class="text-2xl font-semibold">{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
    <div class="tabs tabs-boxed">
      <slot name="tabs"></slot>
    </div>
  </div>
  <slot name="body"></slot>
</template>

<style scoped></style>
