<script setup lang="ts">
import type { Movie } from '@/types/movie'

const props = defineProps<{
  longestMovie: Movie
  shortestMovie: Movie
}>()

</script>

<template>
  <div>
    <div class="mb-16">
      <p class="text-sm">The longest movie you watched is :</p>
      <p class="text-4xl font-bold">{{ props.longestMovie.name_french }}</p>
      <p class="text-2xl">{{ props.longestMovie.runtime }} minutes</p>
    </div>
    <div class="text-right">
      <p class="text-sm">The shortest movie you watched is :</p>
      <p class="text-4xl font-bold">{{ props.shortestMovie.name_french }}</p>
      <p class="text-2xl">{{ props.shortestMovie.runtime }} minutes</p>
    </div>
  </div>
</template>

<style scoped></style>
