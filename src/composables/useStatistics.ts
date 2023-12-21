import type { Movie } from '@/types/movie'
import { computed, type Ref } from 'vue'
import { movies } from '@/store/store'

export function useStatistics(year: Ref<string>) {
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
      return (
        sortedMovies.value
          .map((movie: Movie) => movie.runtime)
          .reduce((a: number, b: number) => a + b, 0) / sortedMovies.value.length
      )
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
    const months: { name: string; numberOfMovies: number }[] = []

    sortedMovies.value.forEach((movie: Movie) => {
      const month = movie.viewing_date.toLocaleString('fr-FR', { month: 'long' })
      const monthIndex = months.findIndex((m) => m.name === month)

      if (monthIndex === -1) {
        months.push({ name: month, numberOfMovies: 1 })
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
    sortedMovies,
    yearList,
    numberOfMoviesWatched,
    longestMovie,
    shortestMovie,
    topMoviesGenres,
    topPlaces,
    topPartners,
    topActors,
    topDirectors,
    topMonths,
    topCountries,
    averageMovieRuntime,
    mostOldMovie,
    mostRecentMovie
  }
}
