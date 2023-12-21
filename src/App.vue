<script setup lang="ts">
import TheStatistics from '@/components/TheStatistics.vue'
import { useFetch } from './composables/useFetch'
import { onMounted, ref } from 'vue'
import TheYearSelect from './components/TheYearSelect.vue'
import { useMovies } from './composables/useMovies'

const yearSelected = ref('')

onMounted(() => {
  useFetch()
})

const { yearList } = useMovies(yearSelected)
</script>

<template>
  <div class="container mx-auto my-8">
    <header>
      <h1 class="text-3xl font-bold">Watchlist Stats</h1>
      <TheYearSelect :years-list="yearList" @update="yearSelected = $event" class="mb-2" />
    </header>

    <main>
      <TheStatistics :year="yearSelected" />
    </main>
  </div>
</template>

<style scoped></style>
