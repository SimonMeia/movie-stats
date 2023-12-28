<script setup lang="ts">
import { computed, watchEffect } from 'vue'

const props = defineProps<{
  runtime: string
}>()

const splitedRuntime = computed(() => props.runtime.split(' '))
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="font-bold text-8xl lg:flex lg:flex-row lg:gap-4">
      <div>
        <span class="text-8xl">{{ splitedRuntime[0] }}</span>
        <span class="text-2xl">{{ splitedRuntime[1] }}</span>
      </div>
      <div>
        <span class="text-8xl">{{ splitedRuntime[2] }}</span>
        <span class="text-2xl">{{ splitedRuntime[3] }}</span>
      </div>
    </div>
    <div class="text-sm">average movie runtime</div>
  </div>
</template>

<style scoped></style>
