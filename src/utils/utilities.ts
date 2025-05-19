import type { Hono } from "hono";

type MiddlewareAttacher = (app: Hono) => void;

export function pipe(app: Hono, ...attachers: MiddlewareAttacher[]) {
  attachers.forEach((attach) => attach(app));
  return app;
}
