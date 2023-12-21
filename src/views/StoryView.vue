<script setup lang="ts">
import { Button } from '@/components/ui/button'
import NumberOfMovies from '@/components/story/NumberOfMovies.vue'
import AverageRuntime from '@/components/story/AverageRuntime.vue'
import { ref, onMounted, watchEffect } from 'vue'
import { useStatistics } from '@/composables/useStatistics'
import { selectedYear } from '@/store/store'

const { numberOfMoviesWatched, averageMovieRuntime } = useStatistics()

selectedYear.value = new Date().getFullYear()

watchEffect(() => {
  console.log(numberOfMoviesWatched.value)
})

const step = ref(1)
</script>

<template>
  <div class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
    <NumberOfMovies
      v-if="step === 1 && numberOfMoviesWatched !== undefined"
      :value="numberOfMoviesWatched"
    ></NumberOfMovies>
    <AverageRuntime
      v-if="step === 2 && averageMovieRuntime !== undefined"
      :runtime="averageMovieRuntime"
    ></AverageRuntime>
  </div>
  <Button @click="step--">Previous</Button>
  <Button @click="step++">Next</Button>
</template>

<style scoped></style>
