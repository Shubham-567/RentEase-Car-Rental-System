import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: "0.0.0.0", // Allow external access
    port: 5173, // Default Vite port
    allowedHosts: [
      "https://rent-ease-73a4.onrender.com/",
      "localhost", // Allow localhost for local testing
    ],
  },
  preview: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: ["https://rent-ease-73a4.onrender.com/", "localhost"],
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit to avoid warnings
  },
});
