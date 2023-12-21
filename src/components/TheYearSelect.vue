<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { selectedYear } from '@/store/store'

const props = defineProps<{
  yearsList: number[]
}>()

const emits = defineEmits({
  update: (value: string) => true
})
let init = false

watchEffect(() => {
  if (props.yearsList[0] && !init) {
    selectedYear.value = props.yearsList[0].toString()
    init = true
  }
})
</script>

<template>
  <div>
    <Select id="year" v-model="selectedYear" @update:model-value="selectedYear = $event">
      <SelectTrigger>
        <SelectValue placeholder="Select a year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem v-for="year in props.yearsList" :key="year" :value="year.toString()">
          {{ year }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
