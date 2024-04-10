/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TITLE: string;
  readonly VITE_THEME_COLOR_PRIMARY: string;
  readonly VITE_WEB_BASE: string;
  readonly VITE_API_ENDPOINT_RESTFUL: string;
  readonly VITE_API_ENDPOINT_TRPC: string;
  readonly VITE_OUTDIR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
