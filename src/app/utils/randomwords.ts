import { range } from "./range.js";

const ALLOWED_CHARS = `abcdefghijklmnopqrstuvwxyz`;

const randomIndex = () => Math.floor(Math.random() * ALLOWED_CHARS.length);

export function generateRandomWord(length: number) {
  return [...range(0, length)].map(() => ALLOWED_CHARS[randomIndex()]).join("");
}
