"use client";

export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <h1 className="font-serif text-4xl font-black">Không thể tải khu vực quản trị</h1>
      <p className="mt-3 font-body text-neutral-600">Đã xảy ra lỗi tạm thời. Thử lại, không hiển thị thông tin hệ thống.</p>
      <button type="button" onClick={reset} className="mt-6 min-h-11 border border-ink px-5 font-sans text-xs font-semibold uppercase tracking-widest">
        Thử lại
      </button>
    </main>
  );
}
