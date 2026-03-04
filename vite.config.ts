import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssSourcemap from "vite-plugin-css-sourcemap";

export default defineConfig({
  plugins: [react(), cssSourcemap()],
  css: { devSourcemap: true },
  build: { sourcemap: true, minify: false },
});