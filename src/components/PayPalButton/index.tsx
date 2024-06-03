//import { createScriptLoader } from '@solid-primitives/script-loader'
import { loadScript } from '@paypal/paypal-js'
import { onMount } from 'solid-js'
import { render } from 'solid-js/web'
export default function PayPalButton() {
  async function loadButton() {
    let paypal
    try {
      paypal = await loadScript({ clientId: 'test' })
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
  return <div id='paypal-button-container'></div>
}
