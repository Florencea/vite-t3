import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { join } from "node:path";
import { cwd } from "node:process";
import { rollup } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import { nodeExternals } from "rollup-plugin-node-externals";
import { defineConfig, loadEnv, type PluginOption } from "vite";

const { VITE_WEB_BASE, VITE_OUTDIR } = loadEnv("development", cwd(), "");

const ServerBuilder = (): PluginOption => {
  return {
    name: "Server Builder",
    writeBundle: async () => {
      const config = await rollup({
        input: "./src/server/app.ts",
        plugins: [nodeExternals(), esbuild({ minify: true })],
      });
      await config.write({
        dir: join(".", VITE_OUTDIR, "server"),
        format: "module",
      });
    },
  };
};

export default defineConfig({
  base: VITE_WEB_BASE,
  build: {
    outDir: join(".", VITE_OUTDIR, "client"),
    chunkSizeWarningLimit: Infinity,
    reportCompressedSize: false,
  },
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: "./src/client/routes",
      generatedRouteTree: "./src/client/routeTree.gen.ts",
      quoteStyle: "double",
      semicolons: true,
      disableLogging: true,
    }),
    ServerBuilder(),
  ],
});
