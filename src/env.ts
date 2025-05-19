import "dotenv/config";

/**
 * letta
 */
export const LETTA_API_URL = process.env.LETTA_API_URL;
export const LETTA_API_KEY = process.env.LETTA_API_KEY;

/**
 * logging
 */
export const ENABLE_LOGGING = process.env.ENABLE_LOGGING === "true";

/**
 * server
 */
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = parseInt(process.env.PORT || "3000", 10);

/**
 * cors
 */
export const ALLOWED_ORIGINS =
  process.env.ALLOWED_ORIGINS === "*"
    ? "*"
    : process.env.ALLOWED_ORIGINS?.split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);

export const ALLOWED_METHODS: "*" | string[] | undefined =
  process.env.ALLOWED_METHODS === "*"
    ? ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"]
    : process.env.ALLOWED_METHODS?.split(",")
        .map((method) => method.trim().toUpperCase())
        .filter(Boolean);

export const ALLOWED_HEADERS: string[] | undefined | ["*"] =
  process.env.ALLOWED_HEADERS === "*"
    ? ["*"]
    : process.env.ALLOWED_HEADERS?.split(",")
        .map((header) => header.trim().toUpperCase())
        .filter(Boolean);

export const EXPOSE_HEADERS: string[] | undefined | ["*"] =
  process.env.EXPOSE_HEADERS === "*"
    ? ["*"]
    : process.env.EXPOSE_HEADERS?.split(",")
        .map((header) => header.trim().toUpperCase())
        .filter(Boolean);

export const CORS_MAX_AGE = parseInt(process.env.CORS_MAX_AGE || "86400", 10);

/**
 * database
 */
export const DATABASE_URL = process.env.DATABASE_URL;
