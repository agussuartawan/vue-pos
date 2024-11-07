<script setup lang="ts">
const links = 10
</script>

<template>
  <div class="dropdown dropdown-hover">
    <div class="join">
      <button
        v-for="i in links"
        :key="i"
        class="join-item btn btn-sm"
        :class="i === 5 ? 'btn-active' : 'bg-base-100'"
      >
        {{ i }}
      </button>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content menu bg-base-300 gap-y-2 rounded-box z-[1] p-3 shadow"
    >
      <li>Item per page</li>
      <li><button class="btn btn-xs btn-active">10</button></li>
      <li><button class="btn btn-xs">50</button></li>
      <li><button class="btn btn-xs">100</button></li>
    </ul>
  </div>
</template>

<style scoped></style>
