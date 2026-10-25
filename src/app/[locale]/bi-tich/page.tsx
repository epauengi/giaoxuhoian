import type { Locale } from "@/lib/i18n/config";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { BI_TICH } from "@/lib/data/bi-tich";
import { localePath } from "@/lib/i18n/routing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPageMetadata } from "@/lib/seo";
import { localize } from "@/lib/i18n/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  return localizedPageMetadata(
    locale,
    locale === "en" ? "Sacraments" : "Bí tích",
    locale === "en"
      ? "Overview and detailed guidelines for the seven Sacraments at Hoi An Parish: conditions, documents, procedure, and contact point."
      : "Tổng quan và hướng dẫn chi tiết bảy Bí tích tại Giáo xứ Hội An: điều kiện, hồ sơ, quy trình và đầu mối liên hệ.",
    "/bi-tich",
  );
}

export default async function BiTichPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const path = (href: string) => localePath(locale, href);
  const p = getDictionary(locale).page.sacraments;
  const biTichList = localize(locale, BI_TICH);

  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label={p.label} title={p.title} as="h1" />
          <p className="drop-cap max-w-3xl font-body text-base leading-relaxed text-neutral-600">
            {locale === "en"
              ? "The Seven Sacraments are efficacious signs of grace, instituted by Christ and entrusted to the Church. At Hoi An Parish, each Sacrament has specific guidelines regarding conditions, required documents, and process — please select the Sacrament you need. For any inquiries, the parish office is pleased to assist."
              : "Bảy Bí tích là những dấu chỉ hữu hiệu của ân sủng, được Chúa Kitô thiết lập và trao cho Hội Thánh. Tại giáo xứ Hội An, mỗi Bí tích có hướng dẫn riêng về điều kiện, hồ sơ và quy trình — xin chọn Bí tích bạn quan tâm. Mọi thắc mắc, văn phòng giáo xứ sẵn lòng hỗ trợ."}
          </p>
        </div>
      </section>

      {/* Grid of 7 sacraments */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <div className="grid grid-cols-1 border-l border-t border-ink md:grid-cols-2">
            {biTichList.map((bt, index) => (
              <Link
                key={bt.slug}
                href={path(`/bi-tich/${bt.slug}`)}
                className="hard-shadow-hover group block border-b border-r border-ink bg-paper p-6 sm:p-8"
              >
                <p className="font-mono text-xs tracking-widest text-neutral-500">
                  {String(index + 1).padStart(2, "0")} · {bt.tenLatinh}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-bold group-hover:underline group-focus-visible:underline group-hover:decoration-accent group-focus-visible:decoration-accent group-hover:decoration-2 group-focus-visible:decoration-2 group-hover:underline-offset-4 group-focus-visible:underline-offset-4">
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
                {locale === "en"
                  ? "The parish issues Baptism, Confirmation, Marriage, and other certificates for individuals who received Sacraments at the parish. Records are commonly used for marriage preparation supplements, study abroad, or parish transfers."
                  : "Giáo xứ cấp chứng thư Rửa tội, Thêm sức, Hôn phối và các giấy chứng nhận khác cho người đã lãnh nhận Bí tích tại giáo xứ. Hồ sơ thường dùng để bổ túc hôn phối, du học hoặc chuyển xứ."}
              </p>
              <ol className="mt-4 space-y-2 font-body text-base">
                <li>
                  {locale === "en"
                    ? "1. Fill out certificate request form at the parish office (or send beforehand via email)."
                    : "1. Điền đơn xin chứng nhận tại văn phòng (hoặc gửi trước qua email)."}
                </li>
                <li>
                  {locale === "en"
                    ? "2. Provide information: full name, date of birth, date of receiving Sacrament (if remembered)."
                    : "2. Cung cấp thông tin: họ tên, ngày sinh, ngày lãnh nhận Bí tích (nếu nhớ)."}
                </li>
                <li>
                  {locale === "en"
                    ? "3. Receive certificate after 3–5 working days."
                    : "3. Nhận chứng thư sau 3–5 ngày làm việc."}
                </li>
              </ol>
            </div>
            <div className="border border-ink p-6 lg:col-span-5">
              <p className="font-sans text-xs font-bold tracking-widest">{p.contact}</p>
              <p className="mt-2 font-body text-sm leading-relaxed">
                {p.officeHours}
                <br />
                Email:{" "}
                <a href="mailto:giaoxuhoian0706@gmail.com" className="font-mono text-accent hover:underline">
                  giaoxuhoian0706@gmail.com
                </a>
              </p>
              <p className="mt-3 font-mono text-xs tracking-widest text-neutral-500">
                * {p.template}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Ornament />
    </>
  );
}
