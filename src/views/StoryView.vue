<script setup lang="ts">
import TheMonthsViewings from '@/components/story/TheMonthsViewings.vue'
import TheNumberOfMovies from '@/components/story/TheNumberOfMovies.vue'
import TheAverageRuntime from '@/components/story/TheAverageRuntime.vue'
import TheLongestShortest from '@/components/story/TheLongestShortest.vue'
import TheBestPartner from '@/components/story/TheBestPartner.vue'
import TheBestPartnerComparison from '@/components/story/TheBestPartnerComparison.vue'
import { Button } from '@/components/ui/button'
import { ref, onMounted, watchEffect } from 'vue'
import { useStatistics } from '@/composables/useStatistics'
import { selectedYear } from '@/store/store'
import { useTopStatistics } from '@/composables/useTopStatistics'

const { numberOfMoviesWatched, averageMovieRuntime, longestMovie, shortestMovie } = useStatistics()
const { topMonths, topPartners } = useTopStatistics()
const { sortedMovies } = useStatistics()

selectedYear.value = new Date().getFullYear().toString()

const step = ref(5)
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
      <TheAverageRuntime
        v-if="step === 2 && averageMovieRuntime"
        :runtime="averageMovieRuntime"
      ></TheAverageRuntime>
      <TheLongestShortest
        v-if="step === 3 && longestMovie && shortestMovie"
        :longestMovie="longestMovie"
        :shortestMovie="shortestMovie"
      ></TheLongestShortest>
      <TheMonthsViewings
        v-if="step === 4 && topMonths.length !== 0"
        :top-months="topMonths"
      ></TheMonthsViewings>
      <TheBestPartner
        v-if="step === 5 && topPartners.length !== 0"
        :top-partners="topPartners"
      ></TheBestPartner>
      <TheBestPartnerComparison
        v-if="step === 6 && topPartners.length !== 0 && sortedMovies.length !== 0"
        :top-partner="topPartners[0]"
        :movies="sortedMovies"
      ></TheBestPartnerComparison>
    </div>
  </main>
</template>

<style scoped></style>
