import type { AMQPMessage } from "@cloudamqp/amqp-client";
import { z } from "zod";

const eventSchema = z.object({
  scope: z.string(),
  name: z.string(),
});

export function parseEvent(message: AMQPMessage) {
  try {
    const data: unknown = JSON.parse(message.bodyToString() ?? "");
    return eventSchema.passthrough().parse(data);
  } catch (e) {
    console.error("Failed to parse event from json", e);
    return undefined;
  }
}
