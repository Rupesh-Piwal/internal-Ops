import { auth } from "@clerk/nextjs/server";

export type UserRole = "admin" | "viewer";

export const checkRole = (role: UserRole) => {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
};
