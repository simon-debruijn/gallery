import { AMQPClient, AMQPError, AMQPQueue } from "@cloudamqp/amqp-client";
import type { Event } from "./createEvent.js";
import type { AMQPBaseClient } from "@cloudamqp/amqp-client/amqp-base-client";
import assert from "assert";

let connection: AMQPBaseClient | undefined;
let queue: AMQPQueue | undefined;

export async function initQueue() {
  try {
    const amqp = new AMQPClient("amqp://localhost");
    connection = await amqp.connect();
    const channel = await connection.channel();
    queue = await channel.queue("jobs");
    console.info("Initialized publisher");
  } catch (error) {
    if (error instanceof AMQPError) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }

  process.on("exit", async () => {
    await closeQueueConnection();
  });
}

async function closeQueueConnection() {
  await connection?.close();
}

export async function publishEvent(event: Event) {
  assert(!!queue);

  await queue.publish(JSON.stringify(event), {
    contentType: "application/json",
  });
}
