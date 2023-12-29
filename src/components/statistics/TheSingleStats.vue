<script setup lang="ts">
import { useStatistics } from '@/composables/useStatistics'
import SingleStatistic from '@/components/statistics/SingleStatistic.vue'

const {
  numberOfMoviesWatched,
  longestMovie,
  shortestMovie,
  averageMovieRuntime,
  mostOldMovie,
  mostRecentMovie
} = useStatistics()
</script>

<template>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <SingleStatistic label="movies watched" :value="numberOfMoviesWatched?.toString()" />
    <SingleStatistic label="was the longest movie" :value="longestMovie?.name_french" />
    <SingleStatistic label="was the shortest movie" :value="shortestMovie?.name_french" />
    <SingleStatistic
      label="is the average movie duration"
      :value="averageMovieRuntime?.toString()"
    />
    <SingleStatistic label="is the most recent movie seen" :value="mostRecentMovie?.name_french" />
    <SingleStatistic label="is the most old movie seen" :value="mostOldMovie?.name_french" />
  </div>
</template>

<style scoped></style>
