interface ImportMetaEnv {
  readonly VITE_SPOONACULAR_API_KEY: string;
  readonly VITE_HF_ACCESS_TOKEN: string;
  readonly VITE_ANTHROPIC_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
