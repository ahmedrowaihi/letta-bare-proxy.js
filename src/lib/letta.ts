import { LettaClient } from "@letta-ai/letta-client";
import { LETTA_API_KEY, LETTA_API_URL } from "../env";

export const letta = new LettaClient({
  baseUrl: LETTA_API_URL,
  token: LETTA_API_KEY,
});
