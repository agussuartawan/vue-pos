<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>

<template>
  <label class="label" :for="label">
    <span class="label-text">{{ label }}</span>
  </label>
</template>

<style scoped></style>
