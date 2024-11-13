<script setup lang="ts">
import type { PropType } from 'vue'

interface ContextMenuPosition {
  x: number
  y: number
}

defineProps({
  position: {
    type: {} as PropType<ContextMenuPosition>,
    default: { x: 0, y: 0 }
  }
})
</script>

<template>
  <div
    ref="contextMenu"
    :style="{ top: `${position.y}px`, left: `${position.x}px` }"
    class="bg-base-300 shadow-lg rounded-lg p-2 absolute"
  ></div>
</template>

<style scoped></style>
