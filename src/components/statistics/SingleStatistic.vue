<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'

defineProps<{
  label: string
  value?: string
}>()
</script>

<template>
  <div>
    <p v-if="value" class="text-2xl">{{ value }}</p>
    <p v-else><Skeleton class="w-full h-6" /></p>
    <h2 class="font-bold text-md text-primary">
      {{ label }}
    </h2>
  </div>
</template>

<style scoped></style>
