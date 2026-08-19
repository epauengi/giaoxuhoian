import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { ButtonLink } from "@/components/ui/button";
import { Halftone } from "@/components/blocks/article-card";
import { GIAO_XU, CHA_XU, HOI_DONG_MUC_VU, GIAO_KHU } from "@/lib/data/giao-xu";
import { localePath } from "@/lib/i18n/routing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = "vi" as const;
  return localizedPageMetadata(
    locale,
    "Giáo xứ",
    "Tổng quan Giáo xứ Hội An: bổn mạng, địa chỉ, cha xứ, Hội đồng Mục vụ, giáo khu và văn phòng giáo xứ.",
    "/giao-xu",
  );
}

export default async function GiaoXuPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = "vi" as const;
  const p = getDictionary(locale).page.parish;
  const path = (href: string) => localePath(locale, href);
  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 lg:grid-cols-12">
          <div className="border-b border-ink p-6 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
            <SectionHeader label={p.label} title={p.title} />
            <p className="drop-cap font-body text-base leading-relaxed text-neutral-600">
              {GIAO_XU.gioiThieu}
            </p>
            <ButtonLink href={path("/giao-xu/lich-su")} className="mt-6">
              {p.history}
            </ButtonLink>
          </div>
          <aside className="p-6 sm:p-8 lg:col-span-5">
            <h2 className="mb-4 border-b-2 border-ink pb-2 font-sans text-xs font-bold uppercase tracking-widest">
              {p.profile}
            </h2>
            <dl className="space-y-3">
              {[
                [p.patron, `${GIAO_XU.boNang} (15.08)`],
                [p.deanery, GIAO_XU.giaoHat],
                [p.diocese, GIAO_XU.giaoPhan],
                [p.address, GIAO_XU.diaChi],
                [p.phone, GIAO_XU.dienThoai],
                [p.email, GIAO_XU.email],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-muted pb-2">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">{k}</dt>
                  <dd className="font-body text-sm">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
              {p.template}
            </p>
          </aside>
        </div>
      </section>

      {/* Clergy */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label={p.personnel} title={p.clergy} />
          <div className="grid grid-cols-1 border-l border-t border-ink sm:grid-cols-2">
            {CHA_XU.map((cha) => (
              <div key={cha.hoTen} className="flex gap-4 border-b border-r border-ink p-6">
                <div className="h-24 w-20 shrink-0 border border-ink bg-neutral-200">
                  <div className="halftone h-full w-full" />
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold">{cha.hoTen}</p>
                  <p className="font-sans text-xs font-semibold uppercase tracking-widest text-accent">
                    {cha.vaiTro}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-neutral-500">
                    {p.term}: {cha.nhiemKy}
                  </p>
                  <p className="mt-1 font-body text-sm italic text-neutral-600">{cha.ghiChu}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parish council */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label={p.currentTerm} title={p.council} />
          <div className="overflow-x-auto border border-ink">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink bg-ink text-paper">
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">{p.name}</th>
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">{p.role}</th>
                </tr>
              </thead>
              <tbody>
                {HOI_DONG_MUC_VU.map((tv) => (
                  <tr key={tv.hoTen} className="border-b border-muted last:border-b-0 hover:bg-neutral-100">
                    <td className="px-4 py-3 font-body text-sm">{tv.hoTen}</td>
                    <td className="px-4 py-3 font-sans text-sm">{tv.vaiTro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Wards */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label={p.structure} title={p.wards} />
          <div className="grid grid-cols-1 border-l border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
            {GIAO_KHU.map((gk) => (
              <div key={gk.ten} className="border-b border-r border-ink p-6">
                <p className="font-serif text-xl font-bold">{gk.ten}</p>
                <p className="mt-2 font-body text-sm text-neutral-600">{gk.khuVuc}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                  {p.patronOf}: {gk.boNang}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office */}
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 py-12 sm:py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader label={p.office} title={p.officeHours} />
            <dl className="space-y-3">
              {GIAO_XU.gioVanPhong.map((g) => (
                <div key={g.buoi} className="flex items-baseline justify-between border-b border-muted pb-2">
                  <dt className="font-sans text-xs font-bold uppercase tracking-widest">{g.buoi}</dt>
                  <dd className="font-mono text-sm">{g.thoiGian}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 font-body text-sm leading-relaxed text-neutral-600">
              {p.officeSupport}
            </p>
          </div>
          <div className="lg:col-span-7">
            <Halftone className="h-64" caption={p.caption} />
          </div>
        </div>
      </section>

      <Ornament />
    </>
  );
}
