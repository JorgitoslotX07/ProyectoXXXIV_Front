// vite.config.ts o vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // <- esto permite conexión desde otras IPs
    port: 5173, // puedes cambiarlo si quieres
  },
});