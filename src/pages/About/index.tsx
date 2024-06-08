import type { Component } from 'solid-js'

export default function About() {
  return (
    <div class='grid grid-cols-1 mt-10 mb-5 place-items-center'>
      <h1 class='w-4/5 md:w-1/2 text-2xl'>I go by Maxwell-</h1>
      <p class='w-4/5 md:w-1/2 mt-5 text-m'>
        I am a human and a painter.
        <br />
        <br />{`I am always creating art.`}
        <br />
        <br />
        enjoy the 
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
