import { Hono } from "hono";
import { logger } from "hono/logger";
import { ENABLE_LOGGING, NODE_ENV } from "../env";

export function attachLogger(app: Hono) {
  if (NODE_ENV === "development" || NODE_ENV === "test" || ENABLE_LOGGING) {
    app.use(logger());
  }
}
