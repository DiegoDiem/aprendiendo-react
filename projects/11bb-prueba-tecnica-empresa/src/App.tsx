/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useMemo, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UserList } from './components/UsersList'
import { useUsers } from './hooks/useUsers'
import Results from './components/Results'

function App () {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  const [showColors, setShowColors] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }
  const toggleSortByCountry = () => {
    // setSortByCountry(prevState => !prevState)
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    void refetch()
  }

  const handleDelete = (email: string) => {
    return users.filter((user) => user.email !== email)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  // para que no se renderice el componente si no hay cambios
  const filteredUsers = useMemo(() => {
    // console.log('Calculate filteredUsers')
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [filterCountry, users])

  // useMemo -> para guardar un valor
  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className='App'>
      <h1>Hello World</h1>
      <Results />
      <header>
        <button onClick={toggleColors}>
          Colorear files
        </button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>
          Resetear estado
        </button>
        <input type='text' placeholder='filtra por país' onChange={e => { setFilterCountry(e.target.value) }} />
      </header>
      <main>
        {users.length > 0 && <UserList changeSorting={handleChangeSort} showColors={showColors} users={sortedUsers} deleteUser={handleDelete} />}

        {isLoading && <p>Cargando...</p>}
        {isError && <p>Hubo un error</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {!isLoading && !isError && hasNextPage === true && <button onClick={() => { void fetchNextPage() }}>Cargar más resultados</button>}
        {!isLoading && !isError && hasNextPage === false && <p>No hay más resultados</p>}
      </main>
    </div>

  )
}

export default App
