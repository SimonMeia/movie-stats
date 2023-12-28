<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

onMounted(() => {
  useFetch()
})
</script>

<template>
  <header></header>
  <RouterView />
</template>

<style scoped></style>
