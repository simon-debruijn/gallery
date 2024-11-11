import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const getDirname = () => dirname(fileURLToPath(import.meta.url));
