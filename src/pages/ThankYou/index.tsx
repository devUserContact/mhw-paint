import type { Component } from 'solid-js'
import { onMount } from 'solid-js'
import { state, setState } from '../../stores/CartStore'

export default function ThankYou() {
  onMount(() => {
    setState('cartCount', 0)
    setState('cart', [])
  })
  return (
    <div>
      <div class='grid h-20 mt-20 place-items-center'>
        <h1 class='grid text-xl'>{`Thank you for your patronage <3`}</h1>
        <h1 class='grid text-xl'>
          {`You can expect an email that contains your package's tracking information shortly.`}
        </h1>
      </div>
    </div>
  )
}
