import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { cp, rm } from "node:fs/promises";
import { join } from "node:path";
import { cwd, exit } from "node:process";
import { rollup } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import { nodeExternals } from "rollup-plugin-node-externals";
import { defineConfig, loadEnv, type PluginOption } from "vite";

const {
  VITE_WEB_BASE,
  VITE_OUTDIR,
  ENABLE_CLIENT,
  ENABLE_SERVER,
  ENABLE_OPENAPI,
} = loadEnv("development", cwd(), "");

const enableClient = ENABLE_CLIENT === "1";
const enableServer = ENABLE_SERVER === "1";
const enableOpenapi = ENABLE_OPENAPI === "1";

if (!enableServer && enableOpenapi) {
  console.error("Error: Server must be enabled when OpenAPI is enabld, exit");
  exit(1);
}

const ClearOutdir = (): PluginOption => {
  return {
    name: "Clear Outdir",
    apply: "build",
    buildStart: async () => {
      await rm(join(".", VITE_OUTDIR), { recursive: true, force: true });
    },
  };
};

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

const RemoveClientAssets = (): PluginOption => {
  return {
    name: "Remove Client Assets",
    apply: "build",
    writeBundle: async () => {
      const clientAssetsPath = enableServer
        ? join(".", VITE_OUTDIR, "client")
        : join(".", VITE_OUTDIR);
      await rm(clientAssetsPath, { recursive: true, force: true });
      if (enableOpenapi) {
        const openapiAssetsSourcePath = join(".", "public", "openapi");
        const openapiAssetsPath = enableServer
          ? join(".", VITE_OUTDIR, "client", "openapi")
          : join(".", VITE_OUTDIR, "openapi");
        await cp(openapiAssetsSourcePath, openapiAssetsPath, {
          recursive: true,
          force: true,
        });
      }
    },
  };
};

const RemoveOpenApiAssets = (): PluginOption => {
  return {
    name: "Remove OpenAPI Assets",
    apply: "build",
    renderStart: async () => {
      const openapiAssetsPath = enableServer
        ? join(".", VITE_OUTDIR, "client", "openapi")
        : join(".", VITE_OUTDIR, "openapi");
      await rm(openapiAssetsPath, { recursive: true, force: true });
    },
  };
};

export default defineConfig({
  base: VITE_WEB_BASE,
  build: {
    outDir: enableServer ? join(".", VITE_OUTDIR, "client") : VITE_OUTDIR,
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
    ClearOutdir(),
    enableServer ? ServerBuilder() : undefined,
    enableClient ? undefined : RemoveClientAssets(),
    enableOpenapi ? undefined : RemoveOpenApiAssets(),
  ].filter(Boolean),
});
