import type { Component } from "solid-js";
import { For } from "solid-js";
import Works from "../../assets/gallery.json";

let work = Works.work;

export default function Gallery() {
  return (
    <div className="grid grid-cols-1 place-items-center md:grid-cols-2">
      <For each={work}>
        {(work, index) => (
          <div className="grid">
            <img className="h-40" href="" tag="{work.title}" />
            <p>{work.title}</p>
          </div>
        )}
      </For>
    </div>
  );
}
