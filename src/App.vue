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
