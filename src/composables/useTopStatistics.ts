import type { Movie } from '@/types/movie'
import { computed } from 'vue'
import { useMovies } from './useMovies'

export function useTopStatistics() {
  const { sortedMovies } = useMovies()

  const topMoviesGenres = computed(() => {
    const genres: { name: string; numberOfMovies: number }[] = []
    sortedMovies.value.forEach((movie: Movie) => {
      movie.genre.forEach((movieGenre: string) => {
        const genreIndex = genres.findIndex((g) => g.name === movieGenre)

        if (genreIndex === -1) {
          genres.push({ name: movieGenre, numberOfMovies: 1 })
        } else {
          genres[genreIndex].numberOfMovies++
        }
      })
    })

    return genres.sort((a, b) => b.numberOfMovies - a.numberOfMovies)
  })

  const topPlaces = computed(() => {
    const places: { name: string; numberOfMovies: number }[] = []

    sortedMovies.value.forEach((movie: Movie) => {
      movie.watch_place.forEach((place: string) => {
        const placeIndex = places.findIndex((p) => p.name === place)

        if (placeIndex === -1) {
          places.push({ name: place, numberOfMovies: 1 })
        } else {
          places[placeIndex].numberOfMovies++
        }
      })
    })

    return places.sort((a, b) => b.numberOfMovies - a.numberOfMovies)
  })

  const topPartners = computed(() => {
    const partners: { name: string; numberOfMovies: number }[] = []

    sortedMovies.value.forEach((movie: Movie) => {
      movie.watch_partner.forEach((partner: string) => {
        if (partner === '-') {
          partner = 'Tout seul'
        }
        const partnerIndex = partners.findIndex((p) => p.name === partner)

        if (partnerIndex === -1) {
          partners.push({ name: partner, numberOfMovies: 1 })
        } else {
          partners[partnerIndex].numberOfMovies++
        }
      })
    })
    return partners.sort((a, b) => b.numberOfMovies - a.numberOfMovies)
  })

  const topActors = computed(() => {
    const actors: { name: string; numberOfMovies: number }[] = []

    sortedMovies.value.forEach((movie: Movie) => {
      movie.cast.forEach((actor: string) => {
        const actorIndex = actors.findIndex((p) => p.name === actor)

        if (actorIndex === -1) {
          actors.push({ name: actor, numberOfMovies: 1 })
        } else {
          actors[actorIndex].numberOfMovies++
        }
      })
    })
    return actors.sort((a, b) => b.numberOfMovies - a.numberOfMovies)
  })

  const topDirectors = computed(() => {
    const directors: { name: string; numberOfMovies: number }[] = []

    sortedMovies.value.forEach((movie: Movie) => {
      movie.director.forEach((director: string) => {
        const directorIndex = directors.findIndex((p) => p.name === director)

        if (directorIndex === -1) {
          directors.push({ name: director, numberOfMovies: 1 })
        } else {
          directors[directorIndex].numberOfMovies++
        }
      })
    })
    return directors.sort((a, b) => b.numberOfMovies - a.numberOfMovies)
  })

  const topMonths = computed(() => {
    const months: { monthName: string; monthId: number; numberOfMovies: number }[] = []

    sortedMovies.value.forEach((movie: Movie) => {
      const month = movie.viewing_date.toLocaleString('fr-FR', { month: 'long' })
      const monthIndex = months.findIndex((m) => m.monthName === month)

      if (monthIndex === -1) {
        months.push({ monthName: month, monthId: movie.viewing_date.getMonth(), numberOfMovies: 1 })
      } else {
        months[monthIndex].numberOfMovies++
      }
    })
    return months.sort((a, b) => b.numberOfMovies - a.numberOfMovies)
  })

  const topCountries = computed(() => {
    const countries: { name: string; numberOfMovies: number }[] = []

    sortedMovies.value.forEach((movie: Movie) => {
      movie.countries.forEach((country: string) => {
        const countryIndex = countries.findIndex((c) => c.name === country)

        if (countryIndex === -1) {
          countries.push({ name: country, numberOfMovies: 1 })
        } else {
          countries[countryIndex].numberOfMovies++
        }
      })
    })
    return countries.sort((a, b) => b.numberOfMovies - a.numberOfMovies)
  })

  return {
    topMoviesGenres,
    topPlaces,
    topPartners,
    topActors,
    topDirectors,
    topMonths,
    topCountries
  }
}
