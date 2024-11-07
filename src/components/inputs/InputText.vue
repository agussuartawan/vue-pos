<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String
  },
  className: {
    type: String
  }
})
</script>

<template>
  <input
    :name="name"
    :id="id"
    :class="className"
    type="text"
    class="input input-sm input-bordered w-full"
  />
</template>

<style scoped></style>
