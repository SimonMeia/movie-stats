<script setup lang="ts">
import { useStatistics } from '@/composables/useStatistics'
import type { Movie } from '@/types/movie'
import { computed, ref, watchEffect } from 'vue'
import SingleStatistic from '@/components/SingleStatistic.vue'

const props = defineProps<{
  year: number
  movies: Movie[]
}>()

const movies = computed(() => props.movies)
const year = computed(() => props.year)

const {
  numberOfMoviesWatched,
  longestMovie,
  shortestMovie,
  averageMovieRuntime,
  mostOldMovie,
  mostRecentMovie
} = useStatistics(movies, year)

watchEffect(() => {
  console.log(averageMovieRuntime.value)
})
</script>

<template>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <SingleStatistic label="Number of movies watched" :value="numberOfMoviesWatched?.toString()" />
    <SingleStatistic label="Longest movie" :value="longestMovie?.name_french" />
    <SingleStatistic label="Shortest movie" :value="shortestMovie?.name_french" />
    <SingleStatistic label="Average movie runtime" :value="averageMovieRuntime?.toString()" />
    <SingleStatistic label="Most recent movie" :value="mostRecentMovie?.name_french" />
    <SingleStatistic label="Oldest movie" :value="mostOldMovie?.name_french" />
  </div>
</template>

<style scoped></style>
