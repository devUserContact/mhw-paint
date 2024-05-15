import { parse } from "https://deno.land/std@0.224.0/toml/mod.ts";
import NavBar from "../../components/NavBar/index.tsx";

const Gallery = await Deno.readTextFile("./assets/Gallery.toml");

export default function GalleryPage() {
  return (
    <div>
      <NavBar />
      <div className="grid">
        <p>
          {parse(Gallery)}
        </p>
      </div>
    </div>
  );
}
