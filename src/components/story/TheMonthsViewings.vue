<script setup lang="ts">
import { VisXYContainer, VisGroupedBar, VisAxis } from '@unovis/vue'
import type { Movie } from '@/types/movie'
import { computed, ref, watchEffect } from 'vue'
import { getShortMonth } from '@/lib/dates'

const props = defineProps<{
  topMonths: { monthName: string; monthId: number; numberOfMovies: number }[]
}>()

type DataRecord = { numberOfMoviesWatched: number; monthId: number }
const data = ref<DataRecord[]>([
  { numberOfMoviesWatched: 0, monthId: 0 },
  { numberOfMoviesWatched: 0, monthId: 1 },
  { numberOfMoviesWatched: 0, monthId: 2 },
  { numberOfMoviesWatched: 0, monthId: 3 },
  { numberOfMoviesWatched: 0, monthId: 4 },
  { numberOfMoviesWatched: 0, monthId: 5 },
  { numberOfMoviesWatched: 0, monthId: 6 },
  { numberOfMoviesWatched: 0, monthId: 7 },
  { numberOfMoviesWatched: 0, monthId: 8 },
  { numberOfMoviesWatched: 0, monthId: 9 },
  { numberOfMoviesWatched: 0, monthId: 10 },
  { numberOfMoviesWatched: 0, monthId: 11 }
])

const max = computed(() => {
  let max = 0
  props.topMonths.forEach((m) => {
    if (m.numberOfMovies > max) max = m.numberOfMovies
  })
  return max
})

watchEffect(() => {
  data.value = props.topMonths.map((m) => ({
    numberOfMoviesWatched: m.numberOfMovies,
    monthId: m.monthId
  }))
})

const x = (data: DataRecord) => data.monthId
const y = (data: DataRecord) => data.numberOfMoviesWatched
</script>

<template>
  <div class="flex flex-col w-full h-full gap-4">
    <h2 class="text-xl font-bold">Viewings by month</h2>
    <VisXYContainer :data="data" class="grow">
      <VisGroupedBar :x="x" :y="y" orientation="horizontal" />
      <VisAxis
        type="y"
        :tickFormat="(x: number) => getShortMonth(x)"
        :numTicks="12"
        :gridLine="false"
        :domainLine="false"
      />
      <VisAxis type="x" :numTicks="max" :domainLine="false" />
    </VisXYContainer>
  </div>
</template>

<style scoped></style>
