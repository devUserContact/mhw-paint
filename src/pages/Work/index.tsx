import type { Component } from 'solid-js'
import { Show, Suspense, createResource } from 'solid-js'
import { useParams } from '@solidjs/router'

export default function Work() {
  const [work] = createResource(async () => {
    deferStream: true
    const params = useParams()
    let uniqe_id = params.work.split('--').pop()
    const response = await fetch(
      `https://artusercontact.com/mhwpaint/gallery/${uniqe_id}`,
    )
    let work = await response.json()
    return work[0]
  })

  return (
    <Suspense>
      <Show when={work()}>
        <div class='grid grid-cols-2 mt-10'>
          <div class=''>
            <img
              class='w-4/5 float-right'
              src={work().image_url}
              alt={work().title}
            />
          </div>
          <div class='mt-auto mb-auto mr-auto ml-10 text-left'>
            <p class=''>mhw</p>
            <p class=''>{work().title}</p>
            <br />
            <p class=''>{work().year_created}</p>
            <p class=''>{work().medium}</p>
            <p class=''>
              {work().size[0]} x {work().size[1]} inches
            </p>
            <br />
            <p class=''>price: ${work().price}.00</p>
          </div>
        </div>
      </Show>
    </Suspense>
  )
}
