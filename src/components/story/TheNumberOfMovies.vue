<script setup lang="ts">
const props = defineProps<{
  value: number
}>()
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="text-sm">you watched</div>
    <div class="font-bold text-9xl">
      {{ props.value }}
    </div>
    <div class="text-sm">movies this year</div>
  </div>
</template>
font-bold text-8xl

<style scoped></style>
