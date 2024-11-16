export const Role = {
  CUSTOMER: "CUSTOMER",
  PHOTOGRAPHER: "PHOTOGRAPHER",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
