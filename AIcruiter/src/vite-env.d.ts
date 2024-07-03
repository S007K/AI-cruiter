/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_STRAPI_API: string;
    // Add other environment variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }