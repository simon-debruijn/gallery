import { AMQPClient, AMQPError, type AMQPQueue } from "@cloudamqp/amqp-client";
import {
  type AlbumEvent,
  AlbumEventToPayload,
  parseAlbumEvent,
} from "./albums.js";
import { z } from "zod";

let queue: AMQPQueue | undefined;

async function initializeQueue() {
  const amqp = new AMQPClient("amqp://localhost");
  const connection = await amqp.connect();
  const channel = await connection.channel();
  return await channel.queue("jobs");
}

type Payload<TEvent extends AlbumEvent> = z.infer<
  (typeof AlbumEventToPayload)[TEvent]
>;

export async function createConsumer<TEvent extends AlbumEvent>(
  event: TEvent,
  consumerFn: (payload: Payload<TEvent>) => Promise<void>,
) {
  try {
    if (!queue) {
      queue = await initializeQueue();
    }

    const consumer = await queue.subscribe({ noAck: true }, (message) => {
      const e = parseAlbumEvent(event, message);
      if (!e) return;

      consumerFn(e);
    });
    console.info("Initialized consumer");

    return consumer;
  } catch (error) {
    if (error instanceof AMQPError) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}
