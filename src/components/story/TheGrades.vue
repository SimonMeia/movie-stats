<script setup lang="ts">
import type { Movie } from '@/types/movie'
import { computed, ref, watchEffect, type Ref } from 'vue'
import { Progress } from '@/components/ui/progress'

const props = defineProps<{
  movies: Movie[]
}>()

const averageGrade = computed(
  () => props.movies.reduce((a, b) => a + b.grade * 100, 0) / props.movies.length
)

interface GradeCategory {
  name: string
  grade: number
  maxGrade: number
  count: number
}

type GradeCategories = Record<string, GradeCategory>

const data: Ref<GradeCategories> = ref({
  grade_story: {
    name: 'Story',
    grade: 0,
    maxGrade: 5,
    count: 0
  },
  grade_directing: {
    name: 'Directing',
    grade: 0,
    maxGrade: 3,
    count: 0
  },
  grade_acting: {
    name: 'Acting',
    grade: 0,
    maxGrade: 3,
    count: 0
  },
  grade_music: {
    name: 'Music',
    grade: 0,
    maxGrade: 3,
    count: 0
  },
  grade_feeling: {
    name: 'Feeling a the end',
    grade: 0,
    maxGrade: 2,
    count: 0
  },
  grade_personal: {
    name: 'Personal grade',
    grade: 0,
    maxGrade: 4,
    count: 0
  }
})

function formatGrade(grade: number) {
  return Math.round(grade * 100) / 100
}

watchEffect(() => {
  for (const movie of props.movies) {
    const gradeKeys = Object.keys(movie).filter((key) => key.includes('grade_'))
    for (const key of gradeKeys) {
      let tempGrade = data.value[key].grade * data.value[key].count
      const movieGrade = movie[key as keyof Movie] as number
      tempGrade += movieGrade
      data.value[key].count++
      data.value[key].grade = tempGrade / data.value[key].count
    }
  }
})
</script>

<template>
  <div class="flex flex-col items-center w-full gap-4">
    <p class="text-sm text-center">The average grades in each category are</p>
    <div v-for="category in data" :key="category.name" class="w-full">
      <div class="text-sm">{{ category.name }}</div>
      <div class="flex flex-row items-center w-full gap-4">
        <Progress :model-value="(category.grade * 100) / category.maxGrade" class="w-full" />
        <div class="text-right shrink-0">
          {{ formatGrade(category.grade) }} / {{ category.maxGrade }}
        </div>
      </div>
    </div>
  </div>
  <div class="absolute left-0 w-full text-center bottom-8">
    Average grade: <span class="text-xl font-bold">{{ formatGrade(averageGrade) }} / 100</span>
  </div>
</template>

<style scoped></style>
