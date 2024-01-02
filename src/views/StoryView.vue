<script setup lang="ts">
import TheNumberOfMovies from '@/components/story/TheNumberOfMovies.vue'
import TheBestGenre from '@/components/story/TheBestGenre.vue'
import TheMonthsViewings from '@/components/story/TheMonthsViewings.vue'
import TheTimeSpent from '@/components/story/TheTimeSpent.vue'
import TheAverageRuntime from '@/components/story/TheAverageRuntime.vue'
import TheLongestShortest from '@/components/story/TheLongestShortest.vue'
import TheBestPartner from '@/components/story/TheBestPartner.vue'
import TheBestPlace from '@/components/story/TheBestPlace.vue'
import TheGrades from '@/components/story/TheGrades.vue'
import TheBestMovies from '@/components/story/TheBestMovies.vue'
import { Button } from '@/components/ui/button'
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { useStatistics } from '@/composables/useStatistics'
import { selectedYear } from '@/store/store'
import { useTopStatistics } from '@/composables/useTopStatistics'
import { useMovies } from '@/composables/useMovies'
import router from '@/router'

const { numberOfMoviesWatched, timeSpent, averageMovieRuntime, longestMovie, shortestMovie } =
  useStatistics()
const { topMonths, topPartners, topGenres, topPlaces } = useTopStatistics()
const { sortedMovies } = useMovies()

// selectedYear.value = new Date().getFullYear().toString()
selectedYear.value = '2023'
let timer = ref(0)
const isTimerRunning = ref(false)
const graphDuration = ref(6000)
const graphAdvancement = computed(() => (timer.value * 100) / graphDuration.value)
const step = ref(10)

let timerInterval = ref<NodeJS.Timeout | undefined>(undefined)

function move(direction: 'forward' | 'back') {
  if (direction === 'forward') {
    if (step.value === 10) {
      router.push({ name: 'home' })
    } else {
      step.value++
    }
  } else {
    if (step.value === 1) {
      router.push({ name: 'home' })
    } else {
      step.value--
    }
  }
  timer.value = 0
}

onMounted(() => {
  // startTimer()
})

onBeforeUnmount(() => {
  stopTimer()
})

function startTimer() {
  timerInterval.value = setInterval(() => {
    if (timer.value >= graphDuration.value) {
      step.value++
      timer.value = 0
    } else {
      timer.value += 10
    }
  }, 10)
  isTimerRunning.value = true
}
function stopTimer() {
  if (!isTimerRunning.value) return
  clearInterval(timerInterval.value)
  isTimerRunning.value = false
}
</script>

<template>
  <main class="container h-dvh">
    <div>
      <div
        class="absolute top-0 left-0 w-1/2 h-full"
        @click="move('back')"
        @pointerdown="stopTimer"
        @pointerup="startTimer"
      ></div>
      <div
        class="absolute top-0 right-0 w-1/2 h-full"
        @click="move('forward')"
        @pointerdown="stopTimer"
        @pointerup="startTimer"
      ></div>
    </div>
    <!-- <div class="absolute top-4 right-4">
      <span
        class="text-gray-300 material-symbols-outlined"
        v-if="!isTimerRunning"
        @click="startTimer"
      >
        play_arrow
      </span>
      <span
        class="text-gray-300 material-symbols-outlined"
        v-if="isTimerRunning"
        @click="stopTimer"
      >
        pause
      </span>
    </div> -->
    <div
      class="absolute top-0 left-0 z-0 h-1 bg-primary"
      :style="{ width: `${graphAdvancement}%` }"
    ></div>
    <!-- <div class="absolute z-50 top-4 right-4">
      <Button @click="step--">Previous</Button>
      <Button @click="step++">Next</Button>
    </div> -->
    <div class="grid h-full py-8 place-items-center">
      <TheNumberOfMovies
        v-if="step === 1 && numberOfMoviesWatched"
        :value="numberOfMoviesWatched"
      ></TheNumberOfMovies>
      <TheTimeSpent v-if="step === 2 && timeSpent" :time-spent="timeSpent"></TheTimeSpent>
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
      <TheBestGenre
        v-if="step === 7 && topGenres.length !== 0"
        :top-genres="topGenres"
      ></TheBestGenre>
      <TheBestPlace v-if="step === 8 && topPlaces.length !== 0" :top-places="topPlaces" />
      <TheGrades v-if="step === 9 && sortedMovies.length !== 0" :movies="sortedMovies" />
      <TheBestMovies v-if="step === 10 && sortedMovies.length !== 0" :movies="sortedMovies" />
    </div>
  </main>
</template>

<style scoped></style>
