import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "127.0.0.1", // instead of 0.0.0.0
    hmr: {
      host: "127.0.0.1",
      port: 24678, // default Vite HMR port
    },
    watch: {
      usePolling: true, // this is key for WSL!
    },
  },
});
