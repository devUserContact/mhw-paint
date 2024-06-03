//import { createScriptLoader } from '@solid-primitives/script-loader'
import { loadScript } from '@paypal/paypal-js'
import { onMount } from 'solid-js'
import { state, setState } from '../../stores/CartStore'

export default function PayPalButton() {
  onMount(() => {
    async function loadButton() {
      let paypal
      try {
        paypal = await loadScript({ clientId: 'test', currency: 'USD', disableFunding: 'card' })
      } catch (error) {
        console.error('failed to load the PayPal JS SDK script', error)
      }
      if (paypal && paypal.Buttons) {
        try {
          await paypal.Buttons().render('#paypal-button-container')
        } catch (error) {
          console.error('failed to render the PayPal Buttons', error)
        }
      }
    }
    loadButton()
  })
  return <div id='paypal-button-container'></div>
}
