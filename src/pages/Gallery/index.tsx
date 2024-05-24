import type { Component } from "solid-js";
import { createResource, For, Match, Switch } from "solid-js";
//import Works from "../../assets/gallery.json";
type Works = {
  id: number;
  title: string;
  year_created: string;
  medium: string;
  size: string;
  description: string;
  number: number;
  sold: number;
  accepting_offers: number;
};

export default function Gallery() {

  const [works] = createResource(async () => {
    const response = await fetch("https://artusercontact.com/mhwpaint/gallery");
    return (await response.json()) as Works[];
  });


  return (
    <Switch>
      <Match></Match>
      <Match when={works}>
        <div class="grid grid-cols-1 ml-10 mr-10 place-items-center md:grid-cols-2">
          <For each={works()}>
            {(work, index) => (
              <div class="relative grid w-auto place-items-center group">
                <img
                  class="h-4/5 group-hover:blur-sm"
                  src={work.image_url}
                  alt={work.title}
                />
                <div class="absolute p-5 w-3/5 bg-slate-200 bg-opacity-50 opacity-0 group-hover:opacity-100">
                  <p class="text-xl text-left">mhw</p>
                  <p class="text-xl text-left italic">{work.title}</p>
                  <br />
                  <p class="text-xl text-left">{work.year_created}</p>
                  <p class="text-xl text-left">{work.medium}</p>
                  <p class="text-xl text-left">
                    {work.size[0]} x {work.size[1]} inches
                  </p>
                </div>
              </div>
            )}
          </For>
        </div>
      </Match>
    </Switch>
  );
}
