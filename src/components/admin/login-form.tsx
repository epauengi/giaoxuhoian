"use client";

import { useActionState } from "react";
import { Input, Field } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction, type LoginState } from "@/app/admin/dang-nhap/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);
  return (
    <form action={formAction} className="w-full max-w-md border border-ink bg-paper p-8">
      <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">Khu vực hạn chế</p>
      <h1 className="mt-2 font-serif text-4xl font-black">Đăng nhập</h1>
      <div className="mt-8 space-y-5">
        <Field label="Tên đăng nhập" required>
          <Input name="username" autoComplete="username" required maxLength={120} />
        </Field>
        <Field label="Mật khẩu" required>
          <Input name="password" type="password" autoComplete="current-password" required maxLength={200} />
        </Field>
        {state.error && <p role="alert" className="text-sm text-red-700">{state.error}</p>}
        <Button type="submit" className="w-full" disabled={pending}>{pending ? "Đang đăng nhập…" : "Đăng nhập"}</Button>
      </div>
    </form>
  );
}
