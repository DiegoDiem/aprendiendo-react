const API_KEY = 'b9561dd9'

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    )
    const json = await response.json()

    const movies = json.Search

    // ? Mapear para dar facilidad de cambiar el contrato de la API
    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (error) {
    throw new Error('Error searching movies')
  }
}
