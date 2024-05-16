import { parse } from "https://deno.land/std@0.224.0/toml/mod.ts";
import NavBar from "../../components/NavBar/index.tsx";

const Gallery = await Deno.readTextFile("./assets/Gallery.toml");
const gallery: string | unknown = parse(Gallery);

export default function GalleryPage() {
  return (
    <div>
      <NavBar />
      <div className="grid-gallery">
        {gallery.work.map(
          (
            work: {
              imageURL: string;
              title: string;
              medium: string;
              yearCreated: string;
              size: string;
              price: string;
            },
            id: number,
          ) => {
            return (
              <div id="id">
                <img className="h-40" href={work.imageURL} alt={work.title} />
                <p>{work.title}</p>
                <p>{work.medium}</p>
                <p>{work.yearCreated}</p>
                <p>{work.size}</p>
                <p>${work.price}.00</p>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
