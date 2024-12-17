import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
  },
  build: {
    outDir: "dist", // Output folder for build files
  },
  base: "/", // Set the base URL for your app (adjust if hosted in a subdirectory)
});
