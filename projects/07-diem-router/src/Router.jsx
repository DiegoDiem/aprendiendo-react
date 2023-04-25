import { EVENTS } from './consts'
import { useState, useEffect, Children } from 'react'
import { match } from 'path-to-regexp'
import { getCurrentPath } from './utils'

// ? Children de react lo usa para iterar los children que recibe el componente

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404 Not Found</h1> }) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath)
    }

    window.addEventListener(EVENTS.PUSHSTAT, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTAT, onLocationChange)
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  // add routes from children <Route /> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    // hemos usado path-to-regex para poder detectar rutas dinámicas como por ejemplo /search/:query <- _query es una ruta dinamica
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    // guardar los parámetros de la url que eran dinámicos
    // y que hemos extraído con path-to-regex
    // por ej, si la ruta es /search/:query
    // y la url es /search/javascript
    // matched.params.query === 'javascript'
    routeParams = matched.params // {query: 'javascript' } // /search/javascript
    return true
  })?.Component

  return Page ? <Page routeParams={routeParams} /> : <DefaultComponent routeParams={routeParams} />
}
