import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { LETTA_API_URL, PORT } from "./env";
import { attachCors } from "./utils/setup-cors";
import { attachLogger } from "./utils/setup-logger";
import { attachLettaProxy } from "./utils/setup-proxy";
import { pipe } from "./utils/utilities";
import packageJson from "../package.json" with { type: "json" };

type Environment = {};

const app = new Hono<Environment>();

// Add health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok", version: packageJson.version });
});

// pipe flavors :'D
pipe(app, attachLogger, attachCors, attachLettaProxy);

console.log("--------------------------------");
console.log(`Starting proxy server on port ${PORT}`);
console.log(`Proxying requests to: ${LETTA_API_URL}`);
console.log("--------------------------------");

serve({
  fetch: app.fetch,
  port: PORT,
});
