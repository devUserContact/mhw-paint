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
            <div class="absolute p-5 w-3/5 bg-slate-200 bg-opacity-50 opacity-0 group-hover:opacity-100">
              <p class="text-xl text-left">mhw</p>
              <p class="text-xl text-left italic">{work.title}</p>
              <br/>
              <p class="text-xl text-left">{work.year_created}</p>
              <p class="text-xl text-left">{work.medium}</p>
              <p class="text-xl text-left">{work.size[0]} x {work.size[1]} inches</p>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
