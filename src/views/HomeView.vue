<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <main class="container">
    <div class="flex flex-col justify-center">
      <h1 class="text-3xl font-bold text-center">Watchlist Stats</h1>
      <Button class="w-full mb-2" @click="router.push({ name: 'story' })">
        Start the rewind
      </Button>
      <Button variant="secondary" @click="router.push({ name: 'statistics' })" class="w-full">
        Or just explore the stats
      </Button>
    </div>
  </main>
</template>

<style scoped></style>
