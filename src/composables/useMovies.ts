import { movies } from '@/store/store'
import type { Movie } from '@/types/movie'
import { computed, type Ref } from 'vue'

export function useMovies(year: Ref<string>) {
  const sortedMovies = computed(() => {
    if (year.value === '' || year.value === 'all') {
      return movies.value
    }
    return movies.value.filter(
      (movie: Movie) => movie.viewing_date.getFullYear() === parseInt(year.value)
    )
  })

  const yearList = computed(() =>
    Array.from(new Set(movies.value.map((movie: Movie) => movie.viewing_date.getFullYear()))).sort(
      (a, b) => b - a
    )
  )

  return { sortedMovies, yearList }
}
