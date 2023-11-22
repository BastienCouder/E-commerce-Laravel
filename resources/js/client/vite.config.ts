import path from "path";
import react from "@vitejs/plugin-react-swc";
import { UserConfigExport, defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "../../../public/react-app",
  },
  rollupOptions: {
    external: ["client/src/main.tsx"],
  },
} as UserConfigExport);
