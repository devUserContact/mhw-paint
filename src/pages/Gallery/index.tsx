import { createResource, For, Suspense, Show } from 'solid-js'

export default function Gallery() {

  const [works] = createResource(() => Gallery, fetchGallery, {
    deferStream: true,
  })

  async function fetchGallery() {
    const response = await fetch('https://mhwpaint.com/api/gallery')
    let works = await response.json()
    return works
  }

  return (
    <Suspense>
      <Show when={works} fallback={<div>loading. . .</div>}>
        <div class='grid grid-cols-1 gap-16 mt-10 mb-10 ml-10 mr-10 place-items-center md:grid-cols-2'>
          <For each={works()}>
            {(work: any) => (
              <div class='relative grid w-auto place-items-center group'>
                <img
                  class='w-4/5 group-hover:blur-sm'
                  src={work.image_url}
                  alt={work.title}
                />
                <div class='absolute p-5 w-3/5 bg-slate-200 bg-opacity-50 opacity-0 group-hover:opacity-100'>
                  <a
                    href={
                      'gallery/' +
                      work.title
                        .split(' ')
                        .join('-')
                        .replace(/[.,]/g, '')
                        .toLowerCase() +
                      '--' +
                      work.unique_id
                    }
                  >
                    <p class='text-xl text-left'>mhw</p>
                    <p class='text-xl text-left italic'>{work.title}</p>
                    <br />
                    <p class='text-xl text-left'>{work.year_created}</p>
                    <p class='text-xl text-left'>{work.medium}</p>
                    <p class='text-xl text-left'>
                      {work.size[0]} x {work.size[1]} inches
                    </p>
                  </a>
                </div>
              </div>
            )}
          </For>
        </div>
      </Show>
    </Suspense>
  )
}
