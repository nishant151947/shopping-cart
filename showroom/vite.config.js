import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 2000,
  //   host: "localhost", // Optional: forces Vite to strictly show 'localhost' instead of '127.0.0.1'
  // },
});
