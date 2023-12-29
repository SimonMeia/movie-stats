<script setup lang="ts">
import { VisXYContainer, VisGroupedBar, VisAxis } from '@unovis/vue'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  topPartners: { name: string; numberOfMovies: number }[]
}>()

type DataRecord = { numberOfMoviesWatched: number; partnerId: number; partnerName: string }
const data = ref<DataRecord[]>([])

const numberOfPartnerToDisplay = 3

watchEffect(() => {
  let counter = 0
  data.value = props.topPartners.map((p) => ({
    numberOfMoviesWatched: p.numberOfMovies,
    partnerId: counter++,
    partnerName: p.name
  }))
  data.value.splice(numberOfPartnerToDisplay)
})

const x = (data: DataRecord) => data.partnerId
const y = (data: DataRecord) => data.numberOfMoviesWatched

function getPartnerName(id: number) {
  return data.value.find((p) => p.partnerId === id)?.partnerName
}
</script>

<template>
  <div class="">
    <h2 class="text-xl font-bold">Viewings by month</h2>
    <VisXYContainer :data="data">
      <VisGroupedBar :x="x" :y="y" />
      <VisAxis type="y" :domainLine="false" />
      <VisAxis
        type="x"
        :domainLine="false"
        :gridLine="false"
        :numTicks="2"
        :tickFormat="(x: number) => getPartnerName(x)"
      />
    </VisXYContainer>
  </div>
</template>

<style scoped></style>
