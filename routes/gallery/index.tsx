import { parse, stringify } from "https://deno.land/std@0.224.0/toml/mod.ts";
import NavBar from "../../components/NavBar/index.tsx";

const Gallery = await Deno.readTextFile("./assets/Gallery.toml");
const gallery = parse(Gallery);

export default function GalleryPage() {
  return (
    <div>
      <NavBar />
      <div classname="grid">
        <p>
          {gallery.work.map((work) => {
            return <p>{work.title}</p>;
          })}
        </p>
      </div>
    </div>
  );
}
