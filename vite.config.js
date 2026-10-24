import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), svelte()],
  // The footer's copyright runs to the year this build was made, not to the visitor's clock.
  define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
});
