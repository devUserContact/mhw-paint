import { Show, Suspense, createResource, createSignal } from 'solid-js'
import { useParams } from '@solidjs/router'
import { makePersisted } from '@solid-primitives/storage'

export default function Work() {
  const [work] = createResource(async () => {
    deferStream: true
    const params = useParams()
    let uniqe_id = params.work.split('--').pop()
    const response = await fetch(
      `http://localhost:3000/mhwpaint/gallery/${uniqe_id}`,
    )
    let work = await response.json()
    return work[0]
  })
  const storeInCart = (id: any) => {
    let idList = localStorage.getItem('ids')
    if (idList == null) {
      localStorage.setItem('ids', id)
    } else if (idList.split(' ').includes(id)) {
      return
    } else if (id !== null) {
      let ids = idList + ' ' + id
      localStorage.setItem('ids', ids)
    }
  }
  return (
    <Suspense>
      <Show when={work()}>
        <div class='grid grid-cols-2 mt-10'>
          <div class=''>
            <img
              class='w-4/5 mb-10 float-right'
              src={work().image_url}
              alt={work().title}
            />
          </div>
          <div class='mt-auto mb-auto mr-auto ml-10 text-left'>
            <p class=''>mhw</p>
            <p class='italic'>{work().title}</p>
            <br />
            <p class=''>{work().year_created}</p>
            <p class=''>{work().medium}</p>
            <p class=''>
              {work().size[0]} x {work().size[1]} inches
            </p>
            <br />
            <Show when={work().sold == 1}>
              <p class='bold'>SOLD</p>
            </Show>
            <Show when={work().sold == 0}>
              <p class=''>price: ${work().price}.00</p>
              <button
                class='mt-2 bg-sky-300 hover:bg-sky-400 text-white font-bold py-1 px-3 rounded-md'
                onClick={[storeInCart, work().unique_id]}
              >
                add to cart
              </button>
            </Show>
          </div>
        </div>
      </Show>
    </Suspense>
  )
}
