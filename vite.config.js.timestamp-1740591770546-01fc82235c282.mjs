// vite.config.js
import path from "path";
import react from "file:///C:/Users/333/Documents/GitHub/Linkatik-Front/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/333/Documents/GitHub/Linkatik-Front/node_modules/vite/dist/node/index.js";
import tailwindcss from "file:///C:/Users/333/Documents/GitHub/Linkatik-Front/node_modules/@tailwindcss/vite/dist/index.mjs";
import tsconfigPaths from "file:///C:/Users/333/Documents/GitHub/Linkatik-Front/node_modules/vite-tsconfig-paths/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\333\\Documents\\GitHub\\Linkatik-Front";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  test: {
    environment: "happy-dom"
  },
  build: {
    outDir: "dist"
    // Output folder for build files
  },
  base: "/",
  // Set the base URL for your app (adjust if hosted in a subdirectory)
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwzMzNcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxMaW5rYXRpay1Gcm9udFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMzMzXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcTGlua2F0aWstRnJvbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzMzMy9Eb2N1bWVudHMvR2l0SHViL0xpbmthdGlrLUZyb250L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdGFpbHdpbmRjc3MoKSxcbiAgXSxcbiAgdGVzdDoge1xuICAgIGVudmlyb25tZW50OiBcImhhcHB5LWRvbVwiLFxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogXCJkaXN0XCIsIC8vIE91dHB1dCBmb2xkZXIgZm9yIGJ1aWxkIGZpbGVzXG4gIH0sXG4gIGJhc2U6IFwiL1wiLCAvLyBTZXQgdGhlIGJhc2UgVVJMIGZvciB5b3VyIGFwcCAoYWRqdXN0IGlmIGhvc3RlZCBpbiBhIHN1YmRpcmVjdG9yeSlcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxufSk7XG5cblxuXG5cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1UsT0FBTyxVQUFVO0FBQ25WLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLG1CQUFtQjtBQUoxQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osYUFBYTtBQUFBLEVBQ2Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLE1BQU07QUFBQTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
