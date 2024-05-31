import { createResource, Suspense, Show, For } from 'solid-js'
import { useParams, useNavigate, useLocation } from '@solidjs/router'

import { state, setState } from '../../stores/CartStore'

export default function Cart() {
  const params = useParams()
  const navigate = useNavigate()

  const [cart] = createResource(() => params.cartItems, fetchItems, {
    deferStream: true,
  })

  async function fetchItems() {
    let cartItems = params.cartItems
    const response = await fetch(
      `http://localhost:3000/mhwpaint/cart/${cartItems}`,
    )
    let cart = await response.json()
    return cart
  }

  const removeCartItem = (id: any) => {
    let cartWithItemRemoved = state.cart.filter((item: any) => item !== id)
    setState('cart', cartWithItemRemoved)
    setState('cartCount', state.cartCount - 1)
    let newUrl = `/cart/${state.cart.join('-')}`
    navigate(newUrl, { replace: true })
  }

  return (
    <Suspense>
      <Show when={cart()}>
        <div class='grid grid-cols-4'>
          <div class='grid col-span-3'>
            <For each={cart()}>
              {(cartItem: any) => (
                <div class='grid grid-cols-2 mt-5'>
                  <div class=''>
                    <img
                      class='w-2/5 pr-5 float-right'
                      src={cartItem.image_url}
                      alt={cartItem.title}
                    />
                  </div>
                  <div class='grid w-3/5'>
                    <button
                      class='mt-auto mb-auto ml-auto pl-2 pr-2 bg-red-400 hover:bg-red-500 rounded-lg'
                      onClick={[removeCartItem, cartItem.unique_id]}
                    >
                      <p class='text-right text-white text-sm'>X</p>
                    </button>
                    <div class='mt-auto mb-auto'>
                      <p class='italic'>{cartItem.title}</p>
                      <p>{`$${cartItem.price}.00`}</p>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
          <div class='grid col-span-1'>
            <div class='mt-2 border-l-2 border-l-slate-600'>
              <p class='ml-6'>{`items:`}</p>
              <For each={cart()}>
                {(cartItem: any) => (
                  <p class='text-right mr-6'>{`${cartItem.price}.00`}</p>
                )}
              </For>
              <p class='ml-6'>{`tax:`}</p>
              <p class='ml-6'>{`shipping:`}</p>
              <p class='mt-2 mb-4 ml-6'>{`+`}</p>
              <p class='ml-4 mr-4 border-t-2 border-t-slate-600'></p>
              <p class='mt-4 ml-6'>{`total:`}</p>
            </div>
          </div>
        </div>
      </Show>
    </Suspense>
  )
}
