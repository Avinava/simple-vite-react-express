// vite.config.js
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import { fileURLToPath } from "url";
import { minify } from "terser";
import { config } from "dotenv";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    outDir: path.resolve(__dirname, "dist"),
    assetsDir: "",
    rollupOptions: {
      plugins: [
        {
          name: "minify",
          renderChunk: async (code) => {
            const result = await minify(code);
            return { code: result.code, map: null };
          },
        },
      ],
    },
    emptyOutDir: true,
    sourcemap: true,
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  },
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    proxy: {
      "/api": `http://localhost:${process.env.PORT}`,
      "/auth": `http://localhost:${process.env.PORT}`,
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`,
      },
    },
  },
});
