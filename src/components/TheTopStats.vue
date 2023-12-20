<script setup lang="ts">
import { useStatistics } from '@/composables/useStatistics'
import type { Movie } from '@/types/movie'
import { computed } from 'vue'
import Top from '@/components/Top.vue'

const props = defineProps<{
  year: number
  movies: Movie[]
}>()

const movies = computed(() => props.movies)
const year = computed(() => props.year)

const {
  topActors,
  topCountries,
  topDirectors,
  topMoviesGenres,
  topMonths,
  topPartners,
  topPlaces
} = useStatistics(movies, year)
</script>

<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <Top :data="topMoviesGenres" name="genres" />
    <Top :data="topActors" name="actors" />
    <Top :data="topPlaces" name="places" />
    <Top :data="topPartners" name="partners" />
    <Top :data="topDirectors" name="directors" />
    <Top :data="topMonths" name="months" />
    <Top :data="topCountries" name="country of origin" />
  </div>
</template>

<style scoped></style>
