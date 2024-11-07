<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: String
})
</script>

<template>
  <label class="input input-bordered flex items-center gap-2">
    <span class="text-gray-500">{{ label }}</span>
    <input type="text" class="grow" :name="name" :value="value" />
  </label>
</template>

<style scoped></style>
