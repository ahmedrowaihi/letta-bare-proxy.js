import type { Context, Hono } from "hono";
import { LETTA_API_KEY, LETTA_API_URL } from "../env";

export class LettaProxy {
  constructor(private readonly baseUrl: string) {}

  private getFullUrl(path: string): URL {
    return new URL(path, this.baseUrl);
  }

  private cleanHeaders(req: Request): void {
    const headersToRemove = [
      "host",
      "connection",
      "content-length",
      "Authorization",
    ];
    headersToRemove.forEach((header) => {
      if (req.headers.get(header)) {
        req.headers.delete(header);
      }
    });
  }

  private setAuthorizationHeader(req: Request, apiKey: string): void {
    req.headers.set("Authorization", `Bearer ${apiKey}`);
  }

  private async processBody(req: Request): Promise<BodyInit | undefined> {
    if (req.method === "GET" || req.method === "HEAD") {
      return undefined;
    }

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      if (!req.body) {
        return undefined;
      }
      const { readable, writable } = new TransformStream();
      req.body.pipeTo(writable);
      return readable;
    }

    if (contentType.includes("application/json")) {
      return await req.text();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      return await req.text();
    } else if (contentType.includes("text/plain")) {
      return await req.text();
    } else if (contentType.includes("application/octet-stream")) {
      return await req.arrayBuffer();
    } else {
      return await req.text();
    }
  }

  private async handleResponse(response: Response): Promise<Response> {
    if (response.headers.get("content-type")?.includes("text/event-stream")) {
      const { readable, writable } = new TransformStream();
      response.body?.pipeTo(writable);
      return new Response(readable, {
        headers: response.headers,
        status: response.status,
      });
    }
    return response;
  }

  private createErrorResponse(error: unknown): Response {
    return new Response(
      JSON.stringify({
        error: "Proxy error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }

  async handleRequest(c: Context): Promise<Response> {
    try {
      const req = c.req.raw.clone();

      this.cleanHeaders(req);
      if (LETTA_API_KEY) {
        this.setAuthorizationHeader(req, LETTA_API_KEY);
      }

      const body = await this.processBody(req);

      const response = await fetch(this.getFullUrl(c.req.path), {
        method: req.method,
        headers: req.headers,
        body,
        redirect: "follow",
      });

      return await this.handleResponse(response);
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export function attachLettaProxy(app: Hono) {
  const proxy = new LettaProxy(LETTA_API_URL);

  app.all("*", async (c: Context) => {
    if (c.req.method === "OPTIONS") {
      return new Response(null, { status: 204 });
    }
    return proxy.handleRequest(c);
  });
}
