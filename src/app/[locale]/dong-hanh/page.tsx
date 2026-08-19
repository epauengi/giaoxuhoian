import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  CHUONG_TRINH_DONG_GOP,
  HINH_THUC_DONG_GOP,
  BAO_CAO_THU_CHI,
  CANH_BAO_GIA_MAO,
} from "@/lib/data/dong-gop";
import { localizedPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = "vi" as const;
  return localizedPageMetadata(
    locale,
    "Đồng hành & Đóng góp",
    "Các chương trình quyên góp, hình thức đóng góp và báo cáo thu–chi minh bạch của Giáo xứ Hội An.",
    "/dong-hanh",
  );
}

export default async function DongHanhPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = "vi" as const;
  const p = getDictionary(locale).page.support;
  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label={p.label} title={p.title} />
          <p className="max-w-2xl font-body text-base leading-relaxed text-neutral-600">
            {p.description}
          </p>
          <div className="mt-6 max-w-2xl border-2 border-accent bg-paper p-4">
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-accent">
              {p.warning}
            </p>
            <p className="mt-1 font-body text-sm leading-relaxed">{CANH_BAO_GIA_MAO}</p>
          </div>
        </div>
      </section>

      {/* Campaigns */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <h2 className="mb-6 font-serif text-3xl font-bold">{p.campaigns}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {CHUONG_TRINH_DONG_GOP.map((cd) => (
              <div key={cd.ten} className="hard-shadow-hover border border-ink bg-paper p-6">
                <h3 className="font-serif text-2xl font-bold">{cd.ten}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-neutral-600">{cd.moTa}</p>
                <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-muted pt-4">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                      {p.reached}
                    </dt>
                    <dd className="font-mono text-xl font-medium text-accent">{cd.daDat}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                      {p.target}
                    </dt>
                    <dd className="font-mono text-xl font-medium">{cd.mucTieu}</dd>
                  </div>
                </dl>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                  {p.deadline}: {cd.thoiHan}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methods — inverted */}
      <section className="newsprint-texture border-b border-ink bg-ink text-paper">
        <div className="mx-auto max-w-screen-xl px-4 py-16">
          <SectionHeader label={p.methodsLabel} title={p.methods} invert />
          <div className="grid grid-cols-1 border-l border-t border-paper lg:grid-cols-3">
            {HINH_THUC_DONG_GOP.map((h) => (
              <div key={h.hinhThuc} className="border-b border-r border-paper p-6">
                <h3 className="font-serif text-2xl font-bold">{h.hinhThuc}</h3>
                <ul className="mt-3 space-y-2">
                  {h.chiTiet.map((c) => (
                    <li key={c} className="font-body text-sm leading-relaxed text-neutral-400">
                      — {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-neutral-400">
            {p.accountTemplate}
          </p>
        </div>
      </section>

      {/* Reports */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <h2 className="mb-6 font-serif text-3xl font-bold">{p.reports}</h2>
          <div className="overflow-x-auto border border-ink">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink bg-ink text-paper">
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">{p.period}</th>
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">{p.income}</th>
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">{p.expense}</th>
                  <th className="hidden px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest sm:table-cell">
                    {p.mainContent}
                  </th>
                </tr>
              </thead>
              <tbody>
                {BAO_CAO_THU_CHI.map((bc) => (
                  <tr key={bc.ky} className="border-b border-muted last:border-b-0 hover:bg-neutral-100">
                    <td className="px-4 py-3 font-sans text-sm font-semibold">{bc.ky}</td>
                    <td className="px-4 py-3 font-mono text-sm">{bc.thu}</td>
                    <td className="px-4 py-3 font-mono text-sm">{bc.chi}</td>
                    <td className="hidden px-4 py-3 font-body text-sm text-neutral-600 sm:table-cell">
                      {bc.noiDung}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
            {p.reportTemplate}
          </p>
        </div>
      </section>

      <Ornament />
    </>
  );
}
