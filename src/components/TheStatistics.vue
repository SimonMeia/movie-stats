<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'
import { useStatistics } from '@/composables/useStatistics'
import { ref } from 'vue'
import TheYearSelect from '@/components/TheYearSelect.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TheSingleStats from './TheSingleStats.vue'
import TheTopStats from './TheTopStats.vue'

const year = ref(new Date().getFullYear())
const { isError, isLoading, movies } = useFetch()
const { yearList } = useStatistics(movies, year)
</script>

<template>
  <TheYearSelect :years="yearList" @update="year = $event" class="mb-2" />

  <div>
    <Tabs default-value="single" class="w-full">
      <TabsList class="w-full">
        <TabsTrigger class="w-1/2" value="single"> Single </TabsTrigger>
        <TabsTrigger class="w-1/2" value="tops"> Tops </TabsTrigger>
      </TabsList>
      <TabsContent value="single">
        <TheSingleStats :movies="movies" :year="year" />
      </TabsContent>
      <TabsContent value="tops">
        <TheTopStats :movies="movies" :year="year" />
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped></style>
