import type { Component } from "solid-js";
import { For } from "solid-js";
import Works from "../../assets/gallery.json";

let work = Works.work;

export default function Gallery() {
  return (
    <div class="grid grid-cols-1 ml-10 mr-10 place-items-center md:grid-cols-2">
      <For each={work}>
        {(work, index) => (
          <div class="relative grid w-auto place-items-center group">
            <img class="h-4/5 group-hover:blur-sm" src={work.image_url} alt={work.title} />
            <div class="absolute w-3/5 h-4/5 opacity-0 group-hover:opacity-100">
              <p class="mt-10 text-xl text-left">{work.title}</p>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
