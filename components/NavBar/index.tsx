export default function NavBar() {
  return (
    <div className="grid grid-cols-3 pt-5 pb-5 bg-sky-300">
      <div className="ml-10">
        <a className="" href="/">🎨</a>
      </div>
      {
        /*
      <div className="text-center">
        <a className="" href="/shop">
          shop
        </a>
      </div>
          */
      }
      <div className="text-center">
        <a className="" href="/gallery">
          gallery
        </a>
      </div>
      <div className="text-center">
        <a className="" href="/about">
          about
        </a>
      </div>
    </div>
  );
}
