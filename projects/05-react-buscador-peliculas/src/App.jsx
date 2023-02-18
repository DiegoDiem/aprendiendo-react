
import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState('')
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '' // true
      return
    }
    if (search === '') {
      setError('No se puede buscar una pelicula')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App () {
  const [sort, setSort] = useState('')
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading, mal } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300)
    , [getMovies])
  const handleSubmit = (event) => {
    event.preventDefault()
    // ?Forma no condicional: cuando no usas react
    // const { query } = Object.fromEntries(new window.FormData(event.target))
    // const fields = new window.FormData(event.target)
    // const query = fields.get('query')
    // if (query === '') {
    //   console.log('No dejar campos vacios')
    //   setError('No dejar campos vacios')
    // }
    // console.log({ search })
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    // * Hacer la busqueda de forma tradicional hasta que se haga el submit
    // const newQuery = event.target.value
    // if (newQuery.startsWith(' ')) return
    // updateSearch(event.target.value)
    // ------------------------------------------
    // * Hacer la busqueda de forma en que se va escribiendo el texto ❗❗ Esto hace muchas peticiones a la API (usar un debaunce)
    const newSearch = event.target.value
    updateSearch(newSearch)
    // getMovies({ search: newSearch })
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }} onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...' type='text' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error} </p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : mal ? <p>{mal}</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
