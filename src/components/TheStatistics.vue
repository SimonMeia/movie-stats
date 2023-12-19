<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'
import { useStatistics } from '@/composables/useStatistics'
import Top from '@/components/Top.vue'
import { ref } from 'vue'

const year = ref(new Date().getFullYear())
const { isError, isLoading, movies } = useFetch()
const {
  numberOfMoviesWatched,
  longestMovie,
  shortestMovie,
  topMoviesGenres,
  topPlaces,
  topPartners,
  topActors,
  topDirectors,
  topMonths,
  topCountries,
  averageMovieRuntime,
  mostOldMovie,
  mostRecentMovie
} = useStatistics(movies, year)
</script>

<template>
  <div v-if="movies">
    <input type="number" name="year" id="year" v-model="year" />
    <p>Number of movies : {{ numberOfMoviesWatched }}</p>
    <p>Longest movie: {{ longestMovie?.name_french }} - {{ longestMovie?.runtime }} minutes</p>
    <p>Shortest movie: {{ shortestMovie?.name_french }} - {{ shortestMovie?.runtime }} minutes</p>
    <p>Average movie runtime: {{ averageMovieRuntime }} minutes</p>
    <p>
      Most recent movie: {{ mostRecentMovie?.name_french }} -
      {{ mostRecentMovie?.release_date.getFullYear() }}
    </p>
    <p>
      Oldest movie: {{ mostOldMovie?.name_french }} - {{ mostOldMovie?.release_date.getFullYear() }}
    </p>
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
