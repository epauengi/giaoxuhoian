import Link from "next/link";

export default function NotFound() {
  return (
    <section className="newsprint-texture border-b border-ink">
      <div className="mx-auto grid min-h-[55vh] max-w-screen-xl place-items-center px-4 py-16 text-center">
        <div>
          <p className="font-mono text-6xl font-medium text-accent sm:text-8xl">404</p>
          <h1 className="mt-3 font-serif text-4xl font-black tracking-tight sm:text-6xl">Không tìm thấy trang</h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-neutral-600">Đường dẫn này không còn tồn tại hoặc đã được chuyển. Bạn có thể trở về trang chủ hoặc xem những tin mới nhất.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-flex min-h-11 items-center border border-ink bg-ink px-6 font-sans text-xs font-semibold uppercase tracking-widest text-paper transition-colors hover:bg-paper hover:text-ink">Trang chủ</Link>
            <Link href="/tin-tuc" className="inline-flex min-h-11 items-center border border-ink px-6 font-sans text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-ink hover:text-paper">Tin giáo xứ</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
