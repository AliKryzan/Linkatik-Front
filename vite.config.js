import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    environment: "happy-dom",
  },
  build: {
    outDir: "dist", // Output folder for build files
  },
  base: "/", // Set the base URL for your app (adjust if hosted in a subdirectory)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});




