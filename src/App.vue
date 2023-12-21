<script setup lang="ts">
import TheStatistics from '@/components/TheStatistics.vue'
import { useFetch } from './composables/useFetch'
import { useStatistics } from './composables/useStatistics'
import { onMounted, ref, watchEffect } from 'vue'
import TheYearSelect from './components/TheYearSelect.vue'

const yearSelected = ref('')

onMounted(() => {
  useFetch()
})

const { yearList } = useStatistics(yearSelected)
</script>

<template>
  <header class="container mx-auto my-8">
    <h1 class="text-3xl font-bold">Watchlist Stats</h1>
    <TheYearSelect :years-list="yearList" @update="yearSelected = $event" class="mb-2" />
  </header>

  <main class="container mx-auto">
    <TheStatistics :year="yearSelected" />
  </main>
</template>

<style scoped></style>
