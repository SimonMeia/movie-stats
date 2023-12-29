<script setup lang="ts">
import TopStatistics from '@/components/statistics/TopStatistics.vue'
import { useTopStatistics } from '@/composables/useTopStatistics'

const {
  topActors,
  topCountries,
  topDirectors,
  topMoviesGenres,
  topMonths,
  topPartners,
  topPlaces
} = useTopStatistics()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <TopStatistics :data="topMoviesGenres" name="genres" />
    <TopStatistics :data="topActors" name="actors" />
    <TopStatistics :data="topPlaces" name="places" />
    <TopStatistics :data="topPartners" name="partners" />
    <TopStatistics :data="topDirectors" name="directors" />
    <TopStatistics
      :data="topMonths.map((m) => ({ name: m.monthName, numberOfMovies: m.numberOfMovies }))"
      name="months"
    />
    <TopStatistics :data="topCountries" name="country of origin" />
  </div>
</template>

<style scoped></style>
