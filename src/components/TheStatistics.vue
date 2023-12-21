<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TheSingleStats from './TheSingleStats.vue'
import TheTopStats from './TheTopStats.vue'
import { computed, watchEffect } from 'vue'

const props = defineProps<{ year: string }>()

</script>

<template>
  <div>
    <Tabs default-value="single" class="w-full">
      <TabsList class="w-full">
        <TabsTrigger class="w-1/2" value="single"> Single </TabsTrigger>
        <TabsTrigger class="w-1/2" value="tops"> Tops </TabsTrigger>
      </TabsList>
      <TabsContent value="single">
        <TheSingleStats :year="year" />
      </TabsContent>
      <TabsContent value="tops">
        <TheTopStats :year="year" />
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped></style>
