import type { Hono } from "hono";
import { cors } from "hono/cors";
import {
  ALLOWED_HEADERS,
  ALLOWED_METHODS,
  ALLOWED_ORIGINS,
  CORS_MAX_AGE,
  EXPOSE_HEADERS,
} from "../env";

export function attachCors(app: Hono) {
  if (!ALLOWED_ORIGINS) {
    return;
  }

  app.use("*", async (c, next) => {
    const origin = c.req.header("Origin");
    // If we have an origin header, use credentials and specific origins
    // If no origin header, use wildcard origin but no credentials
    return cors({
      origin: origin ? (ALLOWED_ORIGINS as string[]) : "*",
      allowMethods: ALLOWED_METHODS as string[],
      allowHeaders: ALLOWED_HEADERS as string[],
      exposeHeaders: EXPOSE_HEADERS as string[],
      credentials: !!origin, // Only enable credentials when we have an origin
      maxAge: CORS_MAX_AGE,
    })(c, next);
  });
}
