<script setup lang="ts">
import TheNumberOfMovies from '@/components/story/TheNumberOfMovies.vue'
import TheBestGenre from '@/components/story/TheBestGenre.vue'
import TheMonthsViewings from '@/components/story/TheMonthsViewings.vue'
import TheAverageRuntime from '@/components/story/TheAverageRuntime.vue'
import TheLongestShortest from '@/components/story/TheLongestShortest.vue'
import TheBestPartner from '@/components/story/TheBestPartner.vue'
import TheBestPlace from '@/components/story/TheBestPlace.vue'
import TheGrades from '@/components/story/TheGrades.vue'
import TheBestMovies from '@/components/story/TheBestMovies.vue'
import { Button } from '@/components/ui/button'
import { ref, watchEffect } from 'vue'
import { useStatistics } from '@/composables/useStatistics'
import { selectedYear } from '@/store/store'
import { useTopStatistics } from '@/composables/useTopStatistics'
import { useMovies } from '@/composables/useMovies'

const { numberOfMoviesWatched, averageMovieRuntime, longestMovie, shortestMovie } = useStatistics()
const { topMonths, topPartners, topGenres, topPlaces } = useTopStatistics()
const { sortedMovies } = useMovies()

// selectedYear.value = new Date().getFullYear().toString()
selectedYear.value = '2023'

watchEffect(() => console.log(sortedMovies.value))

const step = ref(1)
</script>

<template>
  <main class="container h-dvh">
    <div class="absolute z-50 top-4 right-4">
      <Button @click="step--">Previous</Button>
      <Button @click="step++">Next</Button>
    </div>
    <div class="grid h-full py-8 place-items-center">
      <TheNumberOfMovies
        v-if="step === 1 && numberOfMoviesWatched"
        :value="numberOfMoviesWatched"
      ></TheNumberOfMovies>
      <TheBestGenre
        v-if="step === 2 && topGenres.length !== 0"
        :top-genres="topGenres"
      ></TheBestGenre>
      <TheAverageRuntime
        v-if="step === 3 && averageMovieRuntime"
        :runtime="averageMovieRuntime"
      ></TheAverageRuntime>
      <TheLongestShortest
        v-if="step === 4 && longestMovie && shortestMovie"
        :longestMovie="longestMovie"
        :shortestMovie="shortestMovie"
      ></TheLongestShortest>
      <TheMonthsViewings
        v-if="step === 5 && topMonths.length !== 0"
        :top-months="topMonths"
      ></TheMonthsViewings>
      <TheBestPartner
        v-if="step === 6 && topPartners.length !== 0"
        :top-partners="topPartners"
      ></TheBestPartner>
      <TheBestPlace v-if="step === 7 && topPlaces.length !== 0" :top-places="topPlaces" />
      <TheGrades v-if="step === 8 && sortedMovies.length !== 0" :movies="sortedMovies" />
      <TheBestMovies v-if="step === 9 && sortedMovies.length !== 0" :movies="sortedMovies" />
    </div>
  </main>
</template>

<style scoped></style>
