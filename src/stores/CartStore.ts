import { createStore } from 'solid-js/store'

export const [state, setState] = createStore({
  cart: <any>[],
  cartCount: 0,
})
//
//const addToCart = (id: any) => {
//  cartStore.update(state => ({ cart: state.cart.push(id) }))
//}
//
//const updateCartCount = () => {
//  cartStore.update(state => ({ cartCount: state.cartCount }))
//}
//
