import type { Component } from 'solid-js'

export default function About() {
  return (
    <div class='grid grid-cols-1 mt-10 place-items-center'>
      <h1 class='w-1/2 text-2xl'>I go by Maxwell-</h1>
      <p class='mt-5 w-1/2 text-m'>
        I am a human and a painter.
        <br />
        <br />{`I am always creating art.`}
        <br />{`I am also working on building this site to deliver a better user experience.`}
        <br />
        <br />
        I hope to include a contact page for commissions and general
        requests.
        <br />
        <br />
        In the meantime you are free to enjoy the 
        <a
          class='italic text-blue-500'
          href='https://www.mhwpaint.com/gallery'
        >
          gallery 
        </a>
        or my 
        <a
          class='italic text-blue-500'
          href='https://linktr.ee/mhwpaint'
          target='_blank'
        >
          socials
        </a>
        .
        <br />
        <br />
        thank you for stopping by,
        <br />
        mhw 🎨
      </p>
    </div>
  )
}
