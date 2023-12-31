<script setup lang="ts">
import type { Movie } from '@/types/movie'
import { computed } from 'vue'

const props = defineProps<{
  movies: Movie[]
}>()

const bestMovies = computed(() => props.movies.filter((m) => m.grade == 1))
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="movie in bestMovies" :key="movie.name_french">
        <p class="text-xl font-bold ">{{ movie.name_french }}</p>
        <p>{{ movie.director[0] }} - {{ movie.release_date.getFullYear() }}</p>
    </div>
  </div>
</template>

<style scoped></style>
