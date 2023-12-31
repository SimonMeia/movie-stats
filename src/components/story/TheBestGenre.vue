<script setup lang="ts">
import { NestedDonut, type GenericDataRecord } from '@unovis/ts'
import { VisSingleContainer, VisNestedDonut, VisTooltip } from '@unovis/vue'
import { computed } from 'vue'

const props = defineProps<{
  topGenres: { name: string; numberOfMovies: number }[]
}>()

const numberOfGenres = computed(() => props.topGenres.length)

const data = computed(() => {
  const array = []
  for (const p of props.topGenres) {
    for (let i = 0; i < p.numberOfMovies; i++) {
      array.push(p.name)
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
      you explored <span class="text-xl font-bold">{{ numberOfGenres }}</span> genres
    </p>
    <VisSingleContainer :data="data" class="my-12">
      <VisNestedDonut :layers="layers" />
      <VisTooltip :triggers="triggers" />
    </VisSingleContainer>
    <div class="text-sm text-center">
      <p>but your prefered is</p>
      <p class="text-xl font-bold">{{ topGenres[0].name }}</p>
      <p>
        you watched
        <span class="text-xl font-bold">{{ topGenres[0].numberOfMovies }}</span>
        movies of that type
      </p>
    </div>
  </div>
</template>

<style scoped></style>
