export function createEvent<
  TEventName extends string,
  TPayload extends Record<string, unknown>,
>(scope: string, name: TEventName, payload: TPayload) {
  return Object.freeze({
    scope,
    name,
    payload,
    publishedAt: new Date().toUTCString(),
  });
}

export type Event = ReturnType<typeof createEvent>;
