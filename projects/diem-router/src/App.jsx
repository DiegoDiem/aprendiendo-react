import { lazy, Suspense } from 'react'
import './App.css'
// import HomePage from './pages/Home' // import estático
import Page404 from './pages/404'
import SearchPage from './pages/Search'

import { Router } from './Router'
import { Route } from './Route'

const LazyHomePage = lazy(() => import('./pages/Home.jsx')) // import dinámico
const LazyAboutPage = lazy(() => import('./pages/About.jsx')) // import dinámico

const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/twitter',
    Component: () => <h1>Twitter Diem</h1>
  },
  {
    path: '/search/:query', // /search/javascript /search/python  /search/react
    Component: SearchPage
  }
]

function App () {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>

      </Suspense>
    </main>
  )
}

export default App
