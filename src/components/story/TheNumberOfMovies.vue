<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
}>()

const movieFrequency = computed(() => Math.round((365 / props.value) * 10) / 10)
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="text-sm">you watched</div>
    <div class="font-bold text-9xl">
      {{ props.value }}
    </div>
    <div class="text-sm">movies this year</div>
  </div>
  <div class="absolute left-0 w-full text-center bottom-8">
    that is <span class="text-xl font-bold">1</span> movie each
    <span class="text-xl font-bold"> {{ movieFrequency }}</span> days
  </div>
</template>

<style scoped></style>
