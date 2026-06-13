import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { defineConfig } from "vite";

// 1. Возвращаем обратно стандартный плагин, который умеет в babel и compiler
// @ts-ignore
import react from "@vitejs/plugin-react";

// @ts-ignore
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    eslint({
      failOnError: false,
      emitWarning: true,
    }),
    svgr(),
  ],
});
