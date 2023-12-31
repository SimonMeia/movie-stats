<script setup lang="ts">
import { NestedDonut, type GenericDataRecord } from '@unovis/ts'
import { VisSingleContainer, VisNestedDonut, VisTooltip } from '@unovis/vue'
import { computed } from 'vue'

const props = defineProps<{
  topPlaces: { name: string; numberOfMovies: number }[]
}>()

const cities = [
  'La Neuveville',
  'Milan',
  'Bienne',
  'Neuchatel',
  'Lucerne',
  'Berne',
  'Yverdon-Les-Bains',
  'Gênes'
]

const numberOfPlaces = computed(() => {
  let total = 0
  for (const p of props.topPlaces) {
    if (!cities.includes(p.name)) {
      total++
    }
  }
  return total
})

const data = computed(() => {
  const array = []
  for (const p of props.topPlaces) {
    if (!cities.includes(p.name)) {
      for (let i = 0; i < p.numberOfMovies; i++) {
        array.push(p.name)
      }
    }
  }
  return array
})

const triggers = {
  [NestedDonut.selectors.segment]: (d: any) =>
    `<span>${d.data.key} - ${d.data.values.length}</span>`
}

const layers = [(d: string) => d]
</script>

<template>
  <div class="">
    <p class="text-sm text-center">
      you watched movies with <span class="text-xl font-bold">{{ numberOfPlaces }}</span> different
      places
    </p>
    <VisSingleContainer :data="data" class="my-12">
      <VisNestedDonut :layers="layers" />
      <VisTooltip :triggers="triggers" />
    </VisSingleContainer>
    <div class="text-sm text-center">
      <p>but your favourite place to watch movies is</p>
      <p class="text-xl font-bold">{{ topPlaces[0].name }}</p>
      <p>
        where you watched
        <span class="text-xl font-bold">{{ topPlaces[0].numberOfMovies }}</span>
        movies
      </p>
    </div>
  </div>
</template>

<style scoped></style>
