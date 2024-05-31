import { createResource, Suspense, Show, For } from 'solid-js'
import { useParams } from '@solidjs/router'
import { produce } from 'solid-js/store'

import { state, setState } from '../../stores/CartStore'

export default function Cart() {
  const [cart] = createResource(async () => {
    const params = useParams()
    let cartItems = params.cartItems
    const response = await fetch(
      `http://localhost:3000/mhwpaint/cart/${cartItems}`,
    )
    let cart = await response.json()
    return cart
  })

  return (
    <Suspense>
      <Show when={cart}>
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
                  <div class='grid mt-auto mb-auto'>
                    <p class='italic'>{cartItem.title}</p>
                    <p>{`$${cartItem.price}.00`}</p>
                  </div>
                </div>
              )}
            </For>
          </div>
          <div class='grid col-span-1'>
            <div class='mt-2 border-l-2 border-l-slate-600'>
              <p class='ml-5'>total:</p>
            </div>
          </div>
        </div>
      </Show>
    </Suspense>
  )
}
