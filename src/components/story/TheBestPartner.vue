<script setup lang="ts">
import { NestedDonut } from '@unovis/ts';
import { VisSingleContainer, VisNestedDonut, VisTooltip } from '@unovis/vue'
import { computed } from 'vue'

const props = defineProps<{
  topPartners: { name: string; numberOfMovies: number }[]
}>()

const numberOfPartners = computed(() => props.topPartners.length)

const data = computed(() => {
  const array = []
  for (const p of props.topPartners) {
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
      you watched movies with <span class="text-xl font-bold">{{ numberOfPartners }}</span> partners
    </p>
    <VisSingleContainer :data="data" class="my-12">
      <VisNestedDonut :layers="layers" />
      <VisTooltip :triggers="triggers" />
    </VisSingleContainer>
    <div class="text-sm text-center">
      <p>
        your favourite partner is
        <p class="text-xl font-bold">{{ topPartners[0].name }}</p> with
        <span class="text-xl font-bold">{{ topPartners[0].numberOfMovies }}</span> movies
      </p>
    </div>
  </div>
</template>

<style scoped></style>
