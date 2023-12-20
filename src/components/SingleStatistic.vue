<script setup lang="ts">
import { Skeleton } from './ui/skeleton'

const props = defineProps<{
  label: string
  value?: string
}>()
</script>

<template>
  <div>
    <h2 class="text-md">
      {{ label }}
    </h2>
    <p v-if="value" class="text-2xl">{{ value }}</p>
    <p v-else><Skeleton class="w-full h-6 mb-2" /></p>
  </div>
</template>

<style scoped></style>
