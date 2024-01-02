<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  timeSpent: { minutes: string; hours: string; days: string }
}>()

const splitedMinutes = computed(() => props.timeSpent.minutes.split(' '))
const splitedHours = computed(() => props.timeSpent.hours.split(' '))
const splitedDays = computed(() => props.timeSpent.days.split(' '))
</script>

<template>
  <div class="flex flex-col items-center gap-8">
    <div class="text-sm text-center">in total you spent</div>
    <div class="flex flex-col items-center">
      <span class="text-6xl font-bold">{{ splitedMinutes[0] }}</span>
      <span class="text-sm">{{ splitedMinutes[1] }}</span>
    </div>
    <div class="flex flex-col items-center">
      <span class="text-6xl font-bold">{{ splitedHours[0] }}</span>
      <span class="text-sm">{{ splitedHours[1] }}</span>
    </div>
    <div class="flex flex-col items-center">
      <span class="text-6xl font-bold">{{ splitedDays[0] }}</span>
      <span class="text-sm">{{ splitedDays[1] }}</span>
    </div>
    <div class="text-sm text-center">watching movies</div>
  </div>
</template>

<style scoped></style>
