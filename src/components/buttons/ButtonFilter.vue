<script setup lang="ts">
import IconAdjustment from '@/components/icons/IconAdjustment.vue'

defineProps(['filtered'])
</script>

<template>
  <div :class="filtered ? 'dropdown dropdown-hover' : ''">
    <div tabindex="0" role="button" class="">
      <IconAdjustment />
    </div>
    <ul
      v-if="filtered"
      tabindex="0"
      class="dropdown-content menu bg-base-300 rounded-box z-[1] p-2 shadow"
    >
      <li><button>Clear</button></li>
    </ul>
  </div>
</template>

<style scoped></style>
