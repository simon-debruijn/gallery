export const AlbumStatus = {
  UNCLAIMED: "UNCLAIMED",
  CLAIM_REQUESTED: "CLAIM_REQUESTED",
  CLAIMED: "CLAIMED",
} as const;

export type AlbumStatus = (typeof AlbumStatus)[keyof typeof AlbumStatus];
