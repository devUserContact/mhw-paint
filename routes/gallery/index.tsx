import { parse } from "https://deno.land/std@0.224.0/toml/mod.ts";
import NavBar from "../../components/NavBar/index.tsx";

const Gallery = await Deno.readTextFile("./assets/Gallery.toml");
const gallery = parse(Gallery);

export default function GalleryPage() {
  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-2">
        {gallery.work.map((work, id) => {
          return <p id="id">{work.title}</p>;
        })}
      </div>
    </div>
  );
}
