import process from "node:process";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), svelte()],
  // The footer's copyright runs to the year this build was made, not to the visitor's clock.
  // GIT_SHA is the Docker build arg CD passes in (the same one behind /version.json); "dev" elsewhere.
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
    __BUILD_SHA__: JSON.stringify(process.env.GIT_SHA ?? "dev"),
  },
});
