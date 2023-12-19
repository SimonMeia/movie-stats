<script setup lang="ts">
const props = defineProps<{
  name: string
  data: { name: string; numberOfMovies: number }[]
  numberToDisplay?: number
}>()

const numberToDisplay = props.numberToDisplay ?? 3
</script>

<template>
  <div>
    <p>Top {{ numberToDisplay }} {{ name }} :</p>
    <ul>
      <li v-for="row in data.splice(0, numberToDisplay)" :key="row.name">
        {{ row.name }} - {{ row.numberOfMovies }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
