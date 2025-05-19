import { betterAuth } from "better-auth";
import { bearer, openAPI } from "better-auth/plugins";
import { Pool } from "pg";

const getTableName = (name: string) => `better_auth_letta_${name}`;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: getTableName("users"),
  },
  session: {
    modelName: getTableName("user_sessions"),
  },
  account: {
    modelName: getTableName("user_accounts"),
  },
  verification: {
    modelName: getTableName("user_verifications"),
  },
  plugins: [bearer(), openAPI()],
});
