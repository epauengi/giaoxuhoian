import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Đăng nhập quản trị",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-paper px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-6 inline-flex min-h-11 items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.14em] text-neutral-600 underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
          <span aria-hidden>←</span> Về trang chính
        </Link>
        <LoginForm />
      </div>
    </main>
  );
}
