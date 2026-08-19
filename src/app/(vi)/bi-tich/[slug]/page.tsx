import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { BI_TICH } from "@/lib/data/bi-tich";

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <div className="border border-ink p-6">
      <h2 className="mb-3 border-b-2 border-ink pb-2 font-sans text-xs font-bold uppercase tracking-widest">
        {title}
      </h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 font-body text-sm leading-relaxed">
            <span aria-hidden className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-ink" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function generateStaticParams() {
  return BI_TICH.map((bt) => ({ slug: bt.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bt = BI_TICH.find((b) => b.slug === slug);
  if (!bt) return {};
  return { title: `Bí tích ${bt.ten}`, description: bt.tomTat };
}

export default async function BiTichDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bt = BI_TICH.find((b) => b.slug === slug);
  if (!bt) notFound();
  const index = BI_TICH.indexOf(bt);

  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            <Link href="/bi-tich" className="hover:text-accent">Bí tích</Link>
            <span aria-hidden> / </span>
            <span className="text-ink">{bt.ten}</span>
          </nav>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            Bí tích {String(index + 1).padStart(2, "0")} · {bt.tenLatinh}
          </p>
          <h1 className="mt-2 font-serif text-5xl font-black tracking-tight sm:text-6xl">
            {bt.ten}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-neutral-600">
            {bt.tomTat}
          </p>
        </div>
      </section>

      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <DetailBlock title="Điều kiện" items={bt.dieuKien} />
              <DetailBlock title="Hồ sơ cần chuẩn bị" items={bt.hoSo} />
              <div className="border border-ink p-6">
                <h2 className="mb-3 border-b-2 border-ink pb-2 font-sans text-xs font-bold uppercase tracking-widest">
                  Quy trình
                </h2>
                <ol className="space-y-3">
                  {bt.quyTrinh.map((step, i) => (
                    <li key={step} className="flex gap-3 font-body text-sm leading-relaxed">
                      <span className="font-mono text-lg font-medium text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <aside className="space-y-6 lg:col-span-4">
              {bt.lich && (
                <div className="border-2 border-ink bg-ink p-6 text-paper">
                  <p className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-400">
                    Lịch cử hành
                  </p>
                  <p className="mt-2 font-serif text-xl font-bold">{bt.lich}</p>
                </div>
              )}
              <div className="border border-ink p-6">
                <p className="font-sans text-xs font-bold uppercase tracking-widest">Liên hệ</p>
                <p className="mt-2 font-body text-sm leading-relaxed">{bt.lienHe}</p>
                <ButtonLink href="/lien-he" variant="secondary" className="mt-4 w-full">
                  Gửi câu hỏi
                </ButtonLink>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                * Bản mẫu — cần giáo xứ xác nhận
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* Prev/next */}
      <nav aria-label="Bí tích khác" className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 sm:grid-cols-2">
          {BI_TICH[index - 1] && (
            <Link
              href={`/bi-tich/${BI_TICH[index - 1].slug}`}
              className="border-b border-ink p-6 hover:bg-neutral-100 sm:border-b-0 sm:border-r"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">← Trước</p>
              <p className="mt-1 font-serif text-xl font-bold">{BI_TICH[index - 1].ten}</p>
            </Link>
          )}
          {BI_TICH[index + 1] && (
            <Link
              href={`/bi-tich/${BI_TICH[index + 1].slug}`}
              className="p-6 text-right hover:bg-neutral-100"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">Sau →</p>
              <p className="mt-1 font-serif text-xl font-bold">{BI_TICH[index + 1].ten}</p>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
