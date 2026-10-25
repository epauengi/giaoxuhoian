import type { Locale } from "@/lib/i18n/config";
import { MapPin, Mail, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { GIAO_XU } from "@/lib/data/giao-xu";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPageMetadata } from "@/lib/seo";
import { localize } from "@/lib/i18n/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isEn = locale === "en";
  return localizedPageMetadata(
    locale,
    isEn ? "Contact & Directions" : "Liên hệ & Chỉ đường",
    isEn
      ? "Address, email, and directions to Hoi An Parish Church."
      : "Địa chỉ, email và bản đồ chỉ đường đến nhà thờ Giáo xứ Hội An.",
    "/lien-he",
  );
}

export default async function LienHePage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ "khan-cap"?: string }>;
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const isEn = locale === "en";
  const p = getDictionary(locale).page.contact;
  const parish = localize(locale, GIAO_XU);
  const sp = await searchParams;
  const emergencyType = sp["khan-cap"] === "xuc-dau" || sp["khan-cap"] === "tang-le";
  const emailSubject = isEn ? "Contact Hoi An Parish" : "Liên hệ Giáo xứ Hội An";
  const emailUrl = `mailto:${parish.email}?subject=${encodeURIComponent(emailSubject)}`;
  const mapQuery = "106 Nguyễn Trường Tộ, phường Cẩm Phô, Hội An";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

  return (
    <>
      {/* Intro */}
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label={p.label} title={p.title} as="h1" />
          {emergencyType && (
            <div role="alert" className="mb-6 max-w-2xl border-2 border-accent bg-paper p-4 sm:p-5">
              <p className="font-sans text-sm font-bold text-accent">
                {sp["khan-cap"] === "xuc-dau"
                  ? (isEn ? "Urgent pastoral care needed" : "Cần hỗ trợ mục vụ khẩn cấp")
                  : (isEn ? "Funeral arrangement inquiry" : "Liên hệ về tang lễ")}
              </p>
              <p className="mt-2 font-body text-base leading-relaxed text-ink">
                {p.emergencyText}
              </p>
              <a
                href={emailUrl}
                className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 border border-ink bg-ink px-4 py-2 font-sans text-sm font-semibold text-paper underline-offset-4 hover:bg-paper hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Mail aria-hidden className="h-4 w-4" /> {isEn ? "Send email" : "Gửi email"}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Contact info + map */}
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 lg:grid-cols-12">
          <div className="border-b border-ink p-6 sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r">
            <h2 className="mb-6 font-serif text-3xl font-bold">{p.info}</h2>
            <ul className="space-y-4">
              <li className="flex gap-3 border-b border-muted pb-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink">
                  <MapPin aria-hidden className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <p className="font-sans text-sm font-semibold">{p.address}</p>
                  <p className="font-body text-base leading-relaxed">{parish.diaChi}</p>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex min-h-11 items-center gap-1 font-sans text-sm font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                  >
                    {isEn ? "Open directions" : "Mở chỉ đường"} <ExternalLink aria-hidden className="h-4 w-4" />
                  </a>
                </div>
              </li>
              {parish.email && (
                <li className="flex gap-3 border-b border-muted pb-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink">
                    <Mail aria-hidden className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-sans text-sm font-semibold">{p.email}</p>
                    <a
                      href={`mailto:${parish.email}`}
                      className="min-h-11 break-all font-body text-base leading-relaxed underline decoration-accent decoration-2 underline-offset-4"
                    >
                      {parish.email}
                    </a>
                  </div>
                </li>
              )}
            </ul>
            <p className="mt-4 max-w-prose font-body text-sm leading-relaxed text-neutral-600">
              {isEn
                ? "Address and email according to the Hoi An Parish Facebook page. Da Nang Diocese directory lists 02 Nguyen Truong To; information from the two sources is not yet reconciled. Please verify before visiting."
                : "Địa chỉ và email theo trang Facebook của Giáo xứ Hội An. Danh bạ Giáo phận Đà Nẵng ghi địa chỉ 02 Nguyễn Trường Tộ; thông tin hai nguồn chưa thống nhất. Vui lòng kiểm tra trước khi đến."}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-sans text-sm">
              <a
                href="https://www.facebook.com/marcellodoanminh/?locale=vi_VN"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-1 underline decoration-accent decoration-2 underline-offset-4"
              >
                {isEn ? "Parish Facebook" : "Facebook giáo xứ"} <ExternalLink aria-hidden className="h-4 w-4" />
              </a>
              <a
                href="https://giaophandanang.org/category/giao-hat/giao-hat-hoi-an/giao-xu-hoi-an/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-1 underline decoration-accent decoration-2 underline-offset-4"
              >
                {isEn ? "Diocese Directory" : "Danh bạ Giáo phận"} <ExternalLink aria-hidden className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-serif text-3xl font-bold">{p.map}</h2>
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 font-sans text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4"
              >
                {isEn ? "Open map" : "Mở bản đồ"} <ExternalLink aria-hidden className="h-4 w-4" />
              </a>
            </div>
            <div className="relative h-72 border border-ink sm:h-96">
              <iframe
                title={p.mapTitle}
                src={mapEmbedUrl}
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-2 font-body text-sm leading-relaxed text-neutral-600">
              {p.mapCaption}
            </p>
          </div>
        </div>
      </section>

      {/* Fallback direct contact */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <div className="max-w-3xl">
            <SectionHeader label={p.form} title={isEn ? "Contact via email" : "Liên hệ qua email"} />
            <p className="font-body text-base leading-relaxed text-neutral-700">
              {isEn
                ? "Email will open the mail app on your device. If it does not open, please copy the address below."
                : "Email sẽ mở ứng dụng thư trên thiết bị của bạn. Nếu không mở được, hãy sao chép địa chỉ bên dưới."}
            </p>
            <a
              href={emailUrl}
              className="mt-3 inline-flex min-h-11 items-center font-sans text-base font-semibold underline decoration-accent decoration-2 underline-offset-4"
            >
              {parish.email}
            </a>
            <p className="mt-3 font-body text-sm leading-relaxed text-neutral-600">
              {isEn
                ? "Do not send intentions or private information via public Facebook."
                : "Không gửi ý nguyện hoặc thông tin riêng tư qua Facebook công khai."}
            </p>
          </div>
        </div>
      </section>

      <Ornament />
    </>
  );
}
