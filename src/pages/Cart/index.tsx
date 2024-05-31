import { Show, Suspense, createResource } from 'solid-js'
import { useParams } from '@solidjs/router'

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
        <For each={cart()}>
          {(item) => (
            <div class='grid grid-cols-1'>
              <p>{item.title}</p>
              <p>{item.price}</p>
            </div>
          )}
        </For>
      </Show>
    </Suspense>
  )
}
