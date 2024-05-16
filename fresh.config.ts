import {load} from "https://deno.land/std@0.224.0/dotenv/mod.ts"
import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

const env = await load();
const host= env["HOSTNAME"];
console.log(host);

export default defineConfig({
  plugins: [tailwind()],
});
