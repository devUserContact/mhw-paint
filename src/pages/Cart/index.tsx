import { Show, Suspense, createResource } from 'solid-js'
import { state, setState } from '../../stores/CartStore'

export default function Cart() {
  const cartList = [...new Set(localStorage.getItem('ids')?.split(' '))]

  return (
    <div class='grid grid-cols-1'>
      {state.cart.join(' ')}
    </div>
  ) 
}
