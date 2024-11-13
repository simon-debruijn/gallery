import bcrypt, { compare } from "bcrypt";

const SALT_ROUNDS = 10;

export async function encryptPassword(password: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  encryptedPassword: string,
) {
  return await compare(password, encryptedPassword);
}
