<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

onMounted(() => {
  useFetch()
})

</script>

<template>
  <div class="container py-8 mx-auto">
    <header></header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
