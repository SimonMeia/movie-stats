import { movies } from '@/store/store'
import type { Movie } from '@/types/movie'
import { computed } from 'vue'
import { selectedYear } from '@/store/store'

export function useMovies() {
  const sortedMovies = computed(() => {
    if (selectedYear.value === '' || selectedYear.value === 'all') {
      return movies.value
    }
    return movies.value.filter(
      (movie: Movie) => movie.viewing_date.getFullYear() === parseInt(selectedYear.value)
    )
  })

  const yearList = computed(() =>
    Array.from(new Set(movies.value.map((movie: Movie) => movie.viewing_date.getFullYear()))).sort(
      (a, b) => b - a
    )
  )

  return { sortedMovies, yearList }
}
