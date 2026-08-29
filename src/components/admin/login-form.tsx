"use client";

import { useActionState } from "react";
import { Input, Field } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction, type LoginState } from "@/app/admin/dang-nhap/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);
  return (
    <form action={formAction} aria-busy={pending} className="w-full border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-8">
      <div className="flex items-center gap-3 border-b border-muted pb-5"><span aria-hidden className="h-3 w-3 bg-accent" /><p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-neutral-600">Khu vực hạn chế</p></div>
      <h1 className="mt-6 font-serif text-4xl font-black tracking-tight">Đăng nhập</h1>
      <p className="mt-2 font-body text-base leading-relaxed text-neutral-600">Dành cho Ban Truyền thông giáo xứ.</p>
      <div className="mt-8 space-y-5">
        <Field label="Tên đăng nhập" required>
          <Input id="username" name="username" autoComplete="username" required maxLength={120} />
        </Field>
        <Field label="Mật khẩu" required>
          <Input id="password" name="password" type="password" autoComplete="current-password" required maxLength={200} />
        </Field>
        {state.error && <p role="alert" className="border-l-2 border-accent bg-red-50 px-3 py-2 text-sm font-medium text-red-800">{state.error}</p>}
        <Button type="submit" className="w-full" disabled={pending}>{pending ? "Đang đăng nhập…" : "Đăng nhập"}</Button>
        <p aria-live="polite" className="min-h-5 text-center font-mono text-[0.68rem] uppercase tracking-wider text-neutral-500">{pending ? "Đang xác thực" : ""}</p>
      </div>
    </form>
  );
}
