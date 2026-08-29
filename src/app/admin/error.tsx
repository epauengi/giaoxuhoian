"use client";

export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-xl flex-col justify-center px-4 py-16 sm:px-6">
      <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-accent">Khu vực quản trị</p>
      <h1 className="mt-3 font-serif text-4xl font-black tracking-tight sm:text-5xl">Không thể tải nội dung</h1>
      <p className="mt-4 max-w-md font-body text-lg leading-relaxed text-neutral-600">Đã xảy ra lỗi tạm thời. Thử tải lại trang; thông tin hệ thống vẫn được bảo vệ.</p>
      <button type="button" onClick={reset} className="mt-7 inline-flex min-h-11 w-fit items-center border border-ink px-5 font-sans text-xs font-bold uppercase tracking-widest transition-[background-color,color,transform] duration-200 hover:bg-ink hover:text-paper active:translate-y-px">
        Thử tải lại
      </button>
    </main>
  );
}
