<script setup lang="ts">
import { Skeleton } from './ui/skeleton'

const props = defineProps<{
  label: string
  value?: string
}>()
</script>

<template>
  <div>
    <h2 class="font-bold text-md text-primary">
      {{ label }}
    </h2>
    <p v-if="value" class="text-2xl">{{ value }}</p>
    <p v-else><Skeleton class="w-full h-6" /></p>
  </div>
</template>

<style scoped></style>
