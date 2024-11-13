import "dotenv/config";
import { serve } from "@hono/node-server";
import { app } from "./app.js";
import { ENV } from "../infra/config/env.js";
import { initQueue } from "../infra/eventing/queueEvent.js";
import { AMQPError } from "@cloudamqp/amqp-client";

const port = ENV.PORT ?? 3001;

(async function startServer() {
  try {
    await initQueue();

    serve({
      fetch: app.fetch,
      port,
    });

    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error(error);
  }
})();
