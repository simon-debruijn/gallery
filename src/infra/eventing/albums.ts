import { createEvent } from "./createEvent.js";
import { parseEvent } from "./parseEvent.js";
import type { AMQPMessage } from "@cloudamqp/amqp-client";
import { z } from "zod";

const ALBUM_SCOPE = "album";

export const AlbumEvent = {
  RandomCreated: "RandomCreated",
  ClaimRequested: "ClaimRequested",
} as const;

export type AlbumEvent = (typeof AlbumEvent)[keyof typeof AlbumEvent];

const albumEventSchema = z.object({
  scope: z.literal(ALBUM_SCOPE),
  name: z.string(),
});

const randomCreatedSchema = albumEventSchema.extend({
  name: z.literal(AlbumEvent.RandomCreated),
  payload: z.object({
    id: z.string(),
  }),
});

const claimRequestedSchema = albumEventSchema.extend({
  name: z.literal(AlbumEvent.ClaimRequested),
  payload: z.object({
    id: z.string(),
    email: z.string(),
  }),
});

export const AlbumEventToPayload = {
  [AlbumEvent.RandomCreated]: randomCreatedSchema,
  [AlbumEvent.ClaimRequested]: claimRequestedSchema,
} as const;

export function createAlbumEvent<TName extends AlbumEvent>(
  name: TName,
  payload: z.infer<(typeof AlbumEventToPayload)[TName]>["payload"],
) {
  return createEvent(ALBUM_SCOPE, name, payload);
}

export function parseAlbumEvent<TName extends AlbumEvent>(
  name: TName,
  message: AMQPMessage,
) {
  const event = parseEvent(message);
  if (!event) return undefined;

  const result = AlbumEventToPayload[name].safeParse(event);

  if (result.error) {
    return undefined;
  }

  return result.data;
}
