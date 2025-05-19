declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";

      PORT?: string;
      ENABLE_LOGGING?: "true" | "false";

      LETTA_API_URL: string;
      LETTA_API_KEY?: string;

      ALLOWED_ORIGINS?: "*" | string;
      ALLOWED_METHODS?: "*" | string;
      ALLOWED_HEADERS?: "*" | string;
      EXPOSE_HEADERS?: "*" | string;
      CREDENTIALS?: "true" | "false";

      DATABASE_URL?: string;
    }
  }
}

export {};
