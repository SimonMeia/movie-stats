<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis, VisBulletLegend } from '@unovis/vue'
import { ref, watchEffect } from 'vue'
import { getShortMonth } from '@/lib/dates'
import type { Movie } from '@/types/movie'

const props = defineProps<{
  movies: Movie[]
  topPartner: { name: string }
}>()

type DataRecord = { monthId: number; numberAlone: number; numberWithPartner: number }
const data = ref<DataRecord[]>([
  { monthId: 0, numberAlone: 0, numberWithPartner: 0 },
  { monthId: 1, numberAlone: 0, numberWithPartner: 0 },
  { monthId: 2, numberAlone: 0, numberWithPartner: 0 },
  { monthId: 3, numberAlone: 0, numberWithPartner: 0 },
  { monthId: 4, numberAlone: 0, numberWithPartner: 0 },
  { monthId: 5, numberAlone: 0, numberWithPartner: 0 },
  { monthId: 6, numberAlone: 0, numberWithPartner: 0 },
  { monthId: 7, numberAlone: 0, numberWithPartner: 0 },
  { monthId: 8, numberAlone: 0, numberWithPartner: 0 },
  { monthId: 9, numberAlone: 0, numberWithPartner: 0 },
  { monthId: 10, numberAlone: 0, numberWithPartner: 0 },
  { monthId: 11, numberAlone: 0, numberWithPartner: 0 }
])

watchEffect(() => prepareData())

const x = (data: DataRecord) => data.monthId
const y = [(data: DataRecord) => data.numberAlone, (data: DataRecord) => data.numberWithPartner]
const items = [{ name: 'With partner' }, { name: 'Alone' }]

function prepareData() {
  for (let movie of props.movies) {
    if (movie.watch_partner.includes(props.topPartner.name)) {
      data.value[movie.viewing_date.getMonth()].numberWithPartner++
    }
    if (movie.watch_partner.includes('-')) {
      data.value[movie.viewing_date.getMonth()].numberAlone++
    }
  }
}
</script>

<template>
  <div class="">
    <h2 class="text-xl font-bold">Viewings by month</h2>
    <VisBulletLegend :items="items" />
    <VisXYContainer :data="data">
      <VisLine :x="x" :y="y" />
      <VisAxis type="y" :domainLine="false" :gridLine="false" />
      <VisAxis
        type="x"
        :domainLine="false"
        :gridLine="false"
        :tickFormat="(x: number) => getShortMonth(x)"
        :numTicks="12"
      />
    </VisXYContainer>
  </div>
</template>

<style scoped></style>
