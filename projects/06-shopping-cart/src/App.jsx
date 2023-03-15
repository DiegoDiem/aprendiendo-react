import { products as initialProducts } from './mocks/products.json'
import { Products } from './compontens/Products'
import { Header } from './compontens/Header'
import { Footer } from './compontens/Footer'
import { IS_DEVELOPMENT } from './config'
import { useFilters } from './hooks/useFilters'
import { Cart } from './compontens/Cart'
import { CartProvider } from './context/cart'

function App () {
  // const [products] = useState(initialProducts)
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts(initialProducts)
  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  )
}

export default App
