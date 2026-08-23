import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { BI_TICH } from "@/lib/data/bi-tich";
import { localePath } from "@/lib/i18n/routing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = "vi" as const;
  return localizedPageMetadata(
    locale,
    "Bí tích",
    "Tổng quan và hướng dẫn chi tiết bảy Bí tích tại Giáo xứ Hội An: điều kiện, hồ sơ, quy trình và đầu mối liên hệ.",
    "/bi-tich",
  );
}

export default async function BiTichPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = "vi" as const;
  const path = (href: string) => localePath(locale, href);
  const p = getDictionary(locale).page.sacraments;
  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label="Phụng vụ & Bí tích" title="Bảy Bí tích" as="h1" />
          <p className="drop-cap max-w-3xl font-body text-base leading-relaxed text-neutral-600">
            Bảy Bí tích là những dấu chỉ hữu hiệu của ân sủng, được Chúa Kitô thiết lập và trao
            cho Hội Thánh. Tại giáo xứ Hội An, mỗi Bí tích có hướng dẫn riêng về điều kiện, hồ
            sơ và quy trình — xin chọn Bí tích bạn quan tâm. Mọi thắc mắc, văn phòng giáo xứ sẵn
            lòng hỗ trợ.
          </p>
        </div>
      </section>

      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <div className="grid grid-cols-1 border-l border-t border-ink md:grid-cols-2">
            {BI_TICH.map((bt, i) => (
              <Link
                key={bt.slug}
                href={path(`/bi-tich/${bt.slug}`)}
                className="hard-shadow-hover group border-b border-r border-ink bg-paper p-6 sm:p-8"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  {String(i + 1).padStart(2, "0")} · {bt.tenLatinh}
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold group-hover:underline group-focus-visible:underline group-hover:decoration-accent group-focus-visible:decoration-accent group-hover:decoration-2 group-focus-visible:decoration-2 group-hover:underline-offset-4 group-focus-visible:underline-offset-4">
                  {bt.ten}
                </h2>
                <p className="mt-2 font-body text-sm leading-relaxed text-neutral-600">
                  {bt.tomTat}
                </p>
                <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-widest text-accent">
                  {p.guide}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section id="chung-nhan" className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <SectionHeader label={p.procedure} title={p.certificate} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-body text-base leading-relaxed text-neutral-600">
                Giáo xứ cấp chứng thư Rửa tội, Thêm sức, Hôn phối và các giấy chứng nhận khác
                cho người đã lãnh nhận Bí tích tại giáo xứ. Hồ sơ thường dùng để bổ túc hôn phối,
                du học hoặc chuyển xứ.
              </p>
              <ol className="mt-4 space-y-2 font-body text-base">
                <li>1. Điền đơn xin chứng nhận tại văn phòng (hoặc gửi trước qua email).</li>
                <li>2. Cung cấp thông tin: họ tên, ngày sinh, ngày lãnh nhận Bí tích (nếu nhớ).</li>
                <li>3. Nhận chứng thư sau 3–5 ngày làm việc.</li>
              </ol>
            </div>
            <div className="border border-ink p-6 lg:col-span-5">
              <p className="font-sans text-xs font-bold uppercase tracking-widest">{p.contact}</p>
              <p className="mt-2 font-body text-sm leading-relaxed">
                Văn phòng giáo xứ — giờ hành chính
                <br />
                Email: giaoxuhoian0706@gmail.com
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-neutral-500">
                {p.template}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Ornament />
    </>
  );
}
