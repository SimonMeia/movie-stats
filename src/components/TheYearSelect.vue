<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const props = defineProps<{
  years: number[]
}>()

const emits = defineEmits({
  update: (value: number) => true
})
let init = false
const year = ref('')

watchEffect(() => {
  if (props.years[0] && !init) {
    year.value = props.years[0].toString()
    init = true
  }
})
</script>

<template>
  <div>
    <Label for="year">Year</Label>
    <Select id="year" v-model="year" @update:model-value="emits('update', parseInt($event))">
      <SelectTrigger>
        <SelectValue placeholder="Select a year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="year in props.years" :key="year" :value="year.toString()">
          {{ year }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
