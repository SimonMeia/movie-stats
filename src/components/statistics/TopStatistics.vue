<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { computed } from 'vue';

const props = defineProps<{
  name: string
  data: { name: string; numberOfMovies: number }[]
  numberToDisplay?: number
}>()

const data = computed(() => props.data)
const numberToDisplay = props.numberToDisplay ?? 3
</script>

<template>
  <Card>
    <CardHeader class="pb-2">
      <CardTitle v-if="data.length === 0">
        <Skeleton class="w-1/2 h-6" />
      </CardTitle>
      <CardTitle class="font-normal text-md" v-else>Top {{ numberToDisplay }} {{ name }}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul v-if="data.length === 0">
        <li><Skeleton class="w-full h-4 mb-2" /></li>
        <li><Skeleton class="w-full h-4 mb-2" /></li>
        <li><Skeleton class="w-full h-4 mb-2" /></li>
      </ul>
      <ul v-else>
        <li
          v-for="row in data.splice(0, numberToDisplay)"
          :key="row.name"
          class="flex justify-between text-2xl"
        >
          <span> {{ row.name }}</span> <span>{{ row.numberOfMovies }}</span>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>

<style scoped></style>
