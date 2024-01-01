<script setup lang="ts">
import { ref, watchEffect, type Ref } from 'vue'
import { VisAxis, VisBulletLegend, VisCrosshair, VisLine, VisXYContainer } from '@unovis/vue'

import { movies } from '@/store/store'
import { getShortMonth } from '@/lib/dates'

type DataRecord = { monthId: number; viewings: Record<number, number> }
const data = ref<DataRecord[]>([
  { monthId: 0, viewings: {} },
  { monthId: 1, viewings: {} },
  { monthId: 2, viewings: {} },
  { monthId: 3, viewings: {} },
  { monthId: 4, viewings: {} },
  { monthId: 5, viewings: {} },
  { monthId: 6, viewings: {} },
  { monthId: 7, viewings: {} },
  { monthId: 8, viewings: {} },
  { monthId: 9, viewings: {} },
  { monthId: 10, viewings: {} },
  { monthId: 11, viewings: {} }
])

const x = (data: DataRecord) => data.monthId
let y: Ref<((data: DataRecord) => number)[] | undefined> = ref()
const items: Ref<{ name: string }[]> = ref([])

watchEffect(() => {
  if (!movies.value.length) return
  for (const movie of movies.value) {
    const watchMonth = movie.viewing_date.getMonth()
    const watchYear = movie.viewing_date.getFullYear()

    if (!Object.keys(data.value[watchMonth].viewings).includes(String(watchYear))) {
      for (let i = 0; i < 12; i++) {
        data.value[i].viewings[movie.viewing_date.getFullYear()] = 0
      }
      data.value[movie.viewing_date.getMonth()].viewings[movie.viewing_date.getFullYear()] = 1
    } else {
      data.value[movie.viewing_date.getMonth()].viewings[movie.viewing_date.getFullYear()]++
    }
  }

  const years = Array.from(new Set(data.value.flatMap((record) => Object.keys(record.viewings))))
  years.forEach((year) => items.value.push({ name: year }))
  y.value = years.map((year) => (data: DataRecord) => data.viewings[parseInt(year)] || 0)
})
</script>

<template>
  <main class="container h-dvh">
    <VisBulletLegend v-if="items.length > 0" :items="items" bulletShape="line" />
    <VisXYContainer :data="data" v-if="items.length > 0">
      <VisLine :x="x" :y="y" />
      <VisAxis type="y" />
      <VisAxis
        type="x"
        :tickFormat="(y: number) => getShortMonth(y)"
        :numTicks="12"
        :gridLine="false"
        :domainLine="false"
      />
      <VisCrosshair />
    </VisXYContainer>
  </main>
</template>

<style scoped></style>
