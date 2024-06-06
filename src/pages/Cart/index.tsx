import { createResource, Suspense, Show, For, createEffect } from 'solid-js'
import { useParams, useNavigate } from '@solidjs/router'

import PayPalButton from '../../components/PayPalButton'
import { state, setState } from '../../stores/CartStore'

export default function Cart() {
  const params = useParams()
  const navigate = useNavigate()

  const [cart] = createResource(() => params.cartItems, fetchItems, {
    initialValue: [],
    deferStream: true,
  })

  async function fetchItems() {
    let cartItems = params.cartItems
    const response = await fetch(
      `https://mhwpaint.com/api/cart/${cartItems}`,
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

  createEffect(() => {
    const initialValue = 0
    const cartPrices: any = []
    cart().forEach((item) => {
      cartPrices.push(item.price)
    })
    let cartTotal = cartPrices.reduce((a: any, b: any) => a + b, initialValue)
    cartTotal = cartTotal + state.flatRateShipping
    setState('total', cartTotal)
  })

  return (
    <Suspense>
      <Show when={cart()} fallback={<div>the cart is empty</div>}>
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
                  <div class='grid mb-auto w-3/5 '>
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
            <p class='mb-5'></p>
          </div>
          <div class='grid col-span-1'>
            <div class='mt-2 border-l-2 border-l-slate-600'>
              <p class='ml-6'>{`items:`}</p>
              <For each={cart()}>
                {(cartItem: any) => (
                  <p class='text-right mr-6'>{`$${cartItem.price}.00`}</p>
                )}
              </For>
              <p class='ml-6'>{`shipping: `}</p>
              <p class='mr-6 text-right '>{`$${state.flatRateShipping}.00`}</p>
              <p class='mt-2 mb-4 ml-6'>{`+`}</p>
              <p class='ml-4 mr-4 border-t-2 border-t-slate-600'></p>
              <p class='mt-2 ml-6'>{`total: `}</p>
              <p class='mr-6 text-right'>{`$${state.total}.00`}</p>
              <div class='grid mt-5 ml=5 mr-5 place-items-center'>
                <PayPalButton />
              </div>
            </div>
          </div>
        </div>
      </Show>
    </Suspense>
  )
}
