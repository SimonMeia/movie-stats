import type { Movie } from '@/types/movie'
import { computed } from 'vue'
import { getFormattedDuration } from '@/lib/display'
import { useMovies } from './useMovies'

export function useStatistics() {
  const { sortedMovies } = useMovies()

  const numberOfMoviesWatched = computed(() =>
    sortedMovies.value.length ? sortedMovies.value.length : undefined
  )

  const longestMovie = computed(() => {
    const lm = [...sortedMovies.value].sort((a, b) => b.runtime - a.runtime)[0]
    return lm
  })

  const shortestMovie = computed(() => {
    const sm = [...sortedMovies.value].sort((a, b) => a.runtime - b.runtime)[0]
    return sm
  })

  const averageMovieRuntime = computed(() => {
    if (sortedMovies.value.length === 0) {
      return undefined
    } else {
      const average =
        sortedMovies.value
          .map((movie: Movie) => movie.runtime)
          .reduce((a: number, b: number) => a + b, 0) / sortedMovies.value.length
      return getFormattedDuration(average)
    }
  })

  const timeSpent = computed(() => {
    if (sortedMovies.value.length === 0) {
      return undefined
    } else {
      const total = sortedMovies.value
        .map((movie: Movie) => movie.runtime)
        .reduce((a: number, b: number) => a + b, 0)
      const totalHours = total / 60
      const totalDays = totalHours / 24
      return {
        minutes: `${total} minutes`,
        hours: getFormattedDuration(total),
        days: `${Math.round(totalDays * 10) / 10} days`
      }
    }
  })

  const mostRecentMovie = computed(() => {
    return [...sortedMovies.value].sort(
      (a, b) => b.release_date.getTime() - a.release_date.getTime()
    )[0]
  })

  const mostOldMovie = computed(() => {
    return [...sortedMovies.value].sort(
      (a, b) => a.release_date.getTime() - b.release_date.getTime()
    )[0]
  })

  return {
    sortedMovies,
    numberOfMoviesWatched,
    longestMovie,
    shortestMovie,
    averageMovieRuntime,
    timeSpent,
    mostOldMovie,
    mostRecentMovie
  }
}
