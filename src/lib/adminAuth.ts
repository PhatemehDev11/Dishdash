import { auth } from "@/lib/auth";

/**
 * Returns the session if the current user is an ADMIN, otherwise null.
 * Use this at the top of every admin page/API route.
 */
export async function requireAdminSession() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session?.user || role !== "ADMIN") {
    return null;
  }

  return session;
}
