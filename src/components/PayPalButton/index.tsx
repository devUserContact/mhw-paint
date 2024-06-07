import { loadScript } from '@paypal/paypal-js'
import { onMount } from 'solid-js'
import { state, setState } from '../../stores/CartStore'
import { useNavigate } from '@solidjs/router'

export default function PayPalButton() {
  onMount(() => {
    const navigate = useNavigate()
    async function loadButton() {
      let paypal
      try {
        paypal = await loadScript({
          clientId: `${import.meta.env.VITE_PAYPAL_CLIENT_ID}`,
          currency: 'USD',
          disableFunding: 'card',
        })
      } catch (error) {
        console.error('failed to load the PayPal JS SDK script', error)
      }
      if (paypal && paypal.Buttons) {
        try {
          paypal.Buttons()
        } catch (error) {
          console.error('failed to render the PayPal Buttons', error)
        } finally {
          if (window.paypal != null) {
            window.paypal.Buttons!({
              async createOrder() {
                try {
                  const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/api/orders`,
                    {
                      method: 'POST',
                      credentials: 'same-origin',
                      mode: 'cors',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      // use the "body" param to optionally pass additional order information
                      // like product ids and quantities
                      body: JSON.stringify({
                        cart: [
                          {
                            id: state.cart.join('-'),
                            quantity: 1,
                          },
                        ],
                      }),
                    },
                  )

                  const orderData = await response.json()

                  if (orderData.id) {
                    return orderData.id
                  } else {
                    const errorDetail = orderData?.details?.[0]
                    const errorMessage = errorDetail
                      ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                      : JSON.stringify(orderData)

                    throw new Error(errorMessage)
                  }
                } catch (error) {
                  console.error(error)
                  resultMessage(
                    `Could not initiate PayPal Checkout...<br><br>${error}`,
                  )
                }
              },
              async onApprove(data: any, actions: any) {
                try {
                  const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/api/orders/${data.orderID}/capture`,
                    {
                      method: 'POST',
                      credentials: 'same-origin',
                      mode: 'cors',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    },
                  )

                  const orderData = await response.json()
                  // Three cases to handle:
                  //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                  //   (2) Other non-recoverable errors -> Show a failure message
                  //   (3) Successful transaction -> Show confirmation or thank you message

                  const errorDetail = orderData?.details?.[0]

                  if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
                    // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                    return actions.restart()
                  } else if (errorDetail) {
                    // (2) Other non-recoverable errors -> Show a failure message
                    throw new Error(
                      `${errorDetail.description} (${orderData.debug_id})`,
                    )
                  } else if (!orderData.purchase_units) {
                    throw new Error(JSON.stringify(orderData))
                  } else {
                    // (3) Successful transaction -> Show confirmation or thank you message
                    // Or go to another URL:  actions.redirect('thank_you.html');

                    await fetch(
                      `${import.meta.env.VITE_BASE_URL}/api/set-items-to-sold`,
                      {
                        method: 'POST',
                        credentials: 'same-origin',
                        mode: 'cors',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          cart: [
                            {
                              id: state.cart.join('-'),
                            },
                          ],
                        }),
                      },
                    )
                    const transaction =
                      orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                      orderData?.purchase_units?.[0]?.payments
                        ?.authorizations?.[0]
                    resultMessage(
                      `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`,
                    )
                    console.log(
                      'Capture result',
                      orderData,
                      JSON.stringify(orderData, null, 2),
                    )
                  }
                } catch (error) {
                  console.error(error)
                  resultMessage(
                    `Sorry, your transaction could not be processed...<br><br>${error}`,
                  )
                  return
                }
                navigate('/thank-you')
              },
            }).render('#paypal-button-container')
          }
          // Example function to show a result to the user. Your site's UI library can be used instead.
          function resultMessage(message: any) {
            const container = document.querySelector('#result-message')
            container!.innerHTML = message
          }
        }
      }
    }
    loadButton()
  })

  return (
    <>
      <div class='m-2' id='container'>
        <div id='paypal-button-container'></div>
        <p id='result-message'></p>
      </div>
    </>
  )
}
