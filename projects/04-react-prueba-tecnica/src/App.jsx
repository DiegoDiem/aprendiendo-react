import { useEffect, useState } from 'react'
import './App.css'
import { getRandomFact } from './services/facts'

// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50%color=red&json=true`
// https://api.jikan.moe/v4/anime?q=${threeFirstWords}&sfw
const CAT_PREFIX_URL = 'https://cataas.com'
export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ? getRandomFact().then(setFact) -> Lo mismo que abajo
    getRandomFact().then(newFact => setFact(newFact))
  }, [])

  //* Para recuperar la imagen cada vez que tenemos una cita nueva

  useEffect(() => {
    if (!fact) return
    // const firstWord = fact.split(' ').slice(0, 3).join(' ')
    const threeFirstWords = fact.split(' ', 3).join(' ')
    console.log(threeFirstWords)

    fetch(`https://cataas.com/cat/says/${encodeURIComponent(threeFirstWords)}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
        setLoading(false)
      })
  }, [fact])

  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }

  return (
    // ? Estilos en linea
    // <main style={{ display: 'flex', flexDirection: 'column' }}>
    <main style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}> Get new Fact </button>

      {fact && <p>{fact}</p>}
      {loading ? (<div> Cargando...</div>) : <img src={`${CAT_PREFIX_URL}${imageUrl}`} alt={`image extracted using the first three words for ${fact}`} />}
    </main>
  )
}
