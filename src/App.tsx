export default function App(props: any) {
  return (
    <>
      <nav class='grid grid-cols-4 pt-5 pb-5 bg-sky-100'>
        <div class='ml-10'>
          <a class='' href='/'>
            🎨
          </a>
        </div>
        <div class='text-center'>
          <a class='' href='/gallery'>
            gallery
          </a>
        </div>
        <div class='text-center'>
          <a class='' href='/about'>
            about
          </a>
        </div>
        <div class='mr-10 text-right '>
          <a class='' href='/cart'>
            🛍️
          </a>
        </div>
      </nav>
      {props.children}
    </>
  )
}
