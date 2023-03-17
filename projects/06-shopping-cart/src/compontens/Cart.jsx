import './Cart.css'
import { useId } from 'react'
import { ClearCartIcon, CartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart'
// import useScript from '../hooks/useScript'

function CartItem ({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>
          QTY: {quantity}
        </small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>

  )
}

export function Cart () {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart } = useCart()
  // const [isScriptEnabled, setIsScriptEnabled] = useState(false)
  // const isScriptLoaded = useScript('https://code.jquery.com/jquery-3.3.1.slim.min.js', isScriptEnabled)
  // const toggleScript = () => {
  //   setIsScriptEnabled((prevIsScriptEnabled) => !prevIsScriptEnabled)
  // }
  return (
    <>
      <label htmlFor={cartCheckboxId} className='cart-button'>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>
        <button onClick={() => clearCart()}>
          <ClearCartIcon />
        </button>
      </aside>
      {/* <div>
        <button onClick={toggleScript}>
          {isScriptEnabled ? 'Desactivar' : 'Activar'} script
        </button>
        {isScriptLoaded
          ? (
            <p>El script se ha cargado correctamente.</p>
            )
          : (
            <p>El script no está cargado.</p>
            )}
      </div> */}
    </>
  )
}
