<script setup lang="ts">
import InputWithLabel from '@/components/inputs/InputTextWithLabel.vue'

defineProps({
  data: {
    type: Object
  }
})
</script>

<template>
  <form class="">
    <div class="flex flex-col gap-y-4">
      <InputWithLabel name="name" label="Name" :value="data?.name" />
      <InputWithLabel
        name="description"
        label="Description"
        :value="data?.description"
      />
    </div>

    <button class="btn btn-sm mt-3 bg-blue-700 text-white hover:bg-blue-800">
      Save
    </button>
  </form>
</template>

<style scoped></style>
