/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TITLE: string;
  readonly VITE_WEB_BASE: string;
  readonly VITE_API_OPENAPI_DOC_ROUTE: string;
  readonly VITE_API_ENDPOINT_RPC: string;
  readonly VITE_OUTDIR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
