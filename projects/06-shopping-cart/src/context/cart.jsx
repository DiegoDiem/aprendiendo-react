import { createContext, useState } from 'react'

// Crear Contexto
export const CartContext = createContext()

// 2 Crear Provider

export function CartProvider ({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = product => {
    // Check if the product is already in the cart
    const productInCartIndex = cart.findIndex(item => item.id === product.id)

    if (productInCartIndex >= 0) {
      // Una forma sería usando structuredClone
      const newCart = structuredClone(cart)
      newCart[productInCartIndex].quantity += 1
      return setCart(newCart)
    }

    // Product no está en el carrito
    setCart(prevState => ([
      ...prevState,
      {
        ...product,
        quantity: 1
      }
    ]))
  }

  const removeFromCart = product => {
    // setCart(cart.filter(item => item.id !== product.id))
    setCart(prevState => prevState.filter(item => item.id !== product.id))
  }
  const clearCart = () => {
    setCart([])
  }
  return (
    <CartContext.Provider value={{
      cart, addToCart, clearCart, removeFromCart

    }}
    >
      {children}
    </CartContext.Provider>
  )
}
