import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UserList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])
  // useRef -> para guardar un valor
  // que queremos que se comparta entre renderizados
  // pero que al cambiar, no vuelva a arenderizar el componente

  const toggleColors = () => {
    setShowColors(!showColors)
  }
  const toggleSortByCountry = () => {
    // setSortByCountry(prevState => !prevState)
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  // para que no se renderice el componente si no hay cambios
  const filteredUsers = useMemo(() => {
    console.log('Calculate filteredUsers')
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [filterCountry, users])

  // useMemo -> para guardar un valor
  const sortedUsers = useMemo(() => {
    console.log('Calculate SortedUsers')

    // if (sorting === SortBy.NONE) return filteredUsers
    // if (sorting === SortBy.COUNTRY) {
    //   return filteredUsers.toSorted( // .sort muta el array original
    //     (a, b) => a.location.country.localeCompare(b.location.country)
    //   )
    // }
    // if (sorting === SortBy.NAME) {
    //   return filteredUsers.toSorted(
    //     (a, b) => a.name.first.localeCompare(b.name.first)
    //   )
    // }
    // if (sorting === SortBy.LAST) {
    //   return filteredUsers.toSorted(
    //     (a, b) => a.name.last.localeCompare(b.name.last)
    //   )
    // }

    // ? REFACTOR

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
        <UserList changeSorting={handleChangeSort} showColors={showColors} users={sortedUsers} deleteUser={handleDelete} />

      </main>
    </div>

  )
}

export default App
