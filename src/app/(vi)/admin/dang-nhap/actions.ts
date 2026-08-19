"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/../auth";

export type LoginState = { error?: string };

export async function loginAction(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) return { error: "Tên đăng nhập hoặc mật khẩu không đúng." };
    throw error;
  }
}
