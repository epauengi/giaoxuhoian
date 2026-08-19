import "server-only";

import { redirect } from "next/navigation";
import { auth } from "@/../auth";

export async function requireAdmin(options?: { redirectToLogin?: boolean }) {
  const session = await auth();
  const isAdmin = session?.user?.id === "admin" && session.user.role === "admin";
  if (!isAdmin) {
    if (options?.redirectToLogin ?? true) redirect("/admin/dang-nhap");
    throw new Error("Unauthorized");
  }
  return session;
}
