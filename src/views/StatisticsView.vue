<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TheSingleStats from '@/components/statistics/TheSingleStats.vue'
import TheTopStats from '@/components/statistics/TheTopStats.vue'
import { computed, watchEffect } from 'vue'
import { selectedYear } from '@/store/store'
import TheYearSelect from '@/components/TheYearSelect.vue'
import { useMovies } from '@/composables/useMovies'

const { yearList } = useMovies(selectedYear)
</script>

<template>
  <div>
    <TheYearSelect :years-list="yearList" class="mb-2" />
    <Tabs default-value="single" class="w-full">
      <TabsList class="w-full">
        <TabsTrigger class="w-1/2" value="single"> Single </TabsTrigger>
        <TabsTrigger class="w-1/2" value="tops"> Tops </TabsTrigger>
      </TabsList>
      <TabsContent value="single">
        <TheSingleStats :year="selectedYear" />
      </TabsContent>
      <TabsContent value="tops">
        <TheTopStats :year="selectedYear" />
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped></style>
