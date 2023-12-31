<script setup lang="ts">
import { VisSingleContainer, VisNestedDonut } from '@unovis/vue'
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

const layers = [(d: string) => d]
</script>

<template>
  <div class="">
    <p class="text-sm text-center">
      you watched movies with <span class="text-xl font-bold">{{ numberOfPartners }}</span> partners
    </p>
    <VisSingleContainer :data="data" class="my-8">
      <VisNestedDonut :layers="layers" />
    </VisSingleContainer>
    <div class="text-sm text-center">
      <p>
        your favourite partner is
        <span class="text-xl font-bold">{{ topPartners[0].name }}</span> with
        <span class="text-xl font-bold">{{ topPartners[0].numberOfMovies }}</span> movies
      </p>
      <p>
        followed by
        <span class="text-xl font-bold">{{ topPartners[1].name }}</span> with
        <span class="text-xl font-bold">{{ topPartners[1].numberOfMovies }}</span> movies
      </p>
    </div>
  </div>
</template>

<style scoped></style>
