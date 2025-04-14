import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue(), tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "/src/styles/style.scss" as *;`,
        },
      },
    },
    server: {
      host: env.VITE_DEV_SERVER_HOST || "localhost",
      port: parseInt(env.VITE_DEV_SERVER_PORT) || 5173,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
