import { ref, type Ref } from 'vue'
import Papa from 'papaparse'
import type { Movie } from '@/types/movie'
import { movies } from '@/store/store'

export function useFetch() {
  const isLoading = ref(false)
  const isError = ref(false)

  const loadData = () => {
    isLoading.value = true
    isError.value = false

    Papa.parse('/watchlist.csv', {
      download: true,
      header: true,
      complete: (results) => {
        results.data.forEach((movie: any) => {
          movie.viewing_date = new Date(movie.viewing_date)
          movie.grade = parseFloat(movie.grade)
          movie.grade_story = parseInt(movie.grade_story)
          movie.grade_directing = parseInt(movie.grade_directing)
          movie.grade_acting = parseInt(movie.grade_acting)
          movie.grade_music = parseInt(movie.grade_music)
          movie.grade_feeling = parseInt(movie.grade_feeling)
          movie.grade_personal = parseInt(movie.grade_personal)
          movie.watch_place = movie.watch_place.split(',').map((place: string) => place.trim())
          movie.genre = movie.genre.split(',').map((genre: string) => genre.trim())
          movie.tmdb_id = parseInt(movie.tmdb_id)
          movie.release_date = new Date(movie.release_date)
          movie.runtime = parseInt(movie.runtime)
          movie.cast = movie.cast.split(',').map((cast: string) => cast.trim())
          movie.watch_partner = movie.watch_partner
            .split(',')
            .map((partner: string) => partner.trim())
          movie.countries = movie.countries.split(',').map((country: string) => country.trim())
          movie.director = movie.director.split(',').map((director: string) => director.trim())
          movie.producer = movie.producer.split(',').map((producer: string) => producer.trim())
          movie.tmdb_rating = parseInt(movie.tmdb_rating)
        })
        movies.value = results.data as Movie[]
        isLoading.value = false
      },
      error: () => {
        isError.value = true
        isLoading.value = false
      }
    })
  }
  loadData()

  // return { isLoading, isError }
}
