import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { BieuMauForm } from "@/components/blocks/bieu-mau-form";
import { GIAO_XU } from "@/lib/data/giao-xu";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = "vi" as const;
  return localizedPageMetadata(
    locale,
    "Liên hệ & Chỉ đường",
    "Địa chỉ, điện thoại, bản đồ chỉ đường đến nhà thờ Giáo xứ Hội An và biểu mẫu gửi câu hỏi, ý nguyện.",
    "/lien-he",
  );
}

export default async function LienHePage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ "khan-cap"?: string; "chu-de"?: string }>;
  params: Promise<{ locale: string }>;
}) {
  const locale = "vi" as const;
  const p = getDictionary(locale).page.contact;
  const sp = await searchParams;
  const defaultChuDe = sp["khan-cap"] ? "khan-cap" : sp["chu-de"];

  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label={p.label} title={p.title} />
          {sp["khan-cap"] && (
            <div className="mb-6 max-w-2xl border-2 border-accent bg-paper p-4">
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-accent">
                {p.emergency}
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed">
                {p.emergencyText}
              </p>
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
              {[
                { icon: MapPin, label: p.address, value: GIAO_XU.diaChi },
                { icon: Phone, label: p.phone, value: `${GIAO_XU.dienThoai} (${p.office})` },
                { icon: Mail, label: p.email, value: GIAO_XU.email },
              ].map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex gap-3 border-b border-muted pb-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink transition-colors duration-200 hover:bg-ink hover:text-paper">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-500">
                      {label}
                    </p>
                    <p className="font-body text-sm leading-relaxed">{value}</p>
                  </div>
                </li>
              ))}
              <li className="flex gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink">
                  <Clock className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-500">
                    {p.officeHours}
                  </p>
                  {GIAO_XU.gioVanPhong.map((g) => (
                    <p key={g.buoi} className="font-body text-sm leading-relaxed">
                      {g.buoi}: {g.thoiGian}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
              {p.template}
            </p>
          </div>

          <div className="p-6 sm:p-8 lg:col-span-7">
            <h2 className="mb-6 font-serif text-3xl font-bold">{p.map}</h2>
            <div className="relative h-72 border border-ink sm:h-96">
              <iframe
                title={p.mapTitle}
                src="https://www.google.com/maps?q=Nh%C3%A0%20th%E1%BB%9D%20Gi%C3%A1o%20x%E1%BB%A9%20H%E1%BB%99i%20An%2C%20106%20Nguy%E1%BB%85n%20Tr%C6%B0%E1%BB%9Dng%20T%E1%BB%99%2C%20H%E1%BB%99i%20An&output=embed"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
              {p.mapCaption}
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 py-12 sm:py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader label={p.form} title={p.formTitle} />
            <p className="font-body text-sm leading-relaxed text-neutral-600">
              {p.formDescription}
            </p>
          </div>
          <div className="relative lg:col-span-8">
            <BieuMauForm locale={locale} defaultChuDe={defaultChuDe} />
          </div>
        </div>
      </section>

      <Ornament />
    </>
  );
}
