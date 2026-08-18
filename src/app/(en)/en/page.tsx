import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { GIO_LE_THUONG_KY } from "@/lib/data/gio-le";
import { GIAO_XU } from "@/lib/data/giao-xu";

export const metadata: Metadata = {
  title: "English — Mass Times & Visitor Guide",
  description:
    "Essential information for visitors and foreign Catholics: Mass schedule, visiting rules and contact details of Hoi An Parish.",
};

const EN_DAYS: Record<string, string> = {
  "Thứ Hai – Thứ Sáu": "Monday – Friday",
  "Thứ Bảy": "Saturday",
  "Chúa nhật": "Sunday",
};

const VISITOR_RULES = [
  "The church is open daily from early morning until evening. All are welcome to attend Mass.",
  "Please dress modestly when entering the church (shoulders and knees covered).",
  "Photography is allowed outside; inside the church, please be discreet and never during Mass.",
  "Silence your phone and speak softly — this is a place of worship, not a tourist attraction.",
  "The main gate is on Nguyen Truong To Street, a short walk from the Japanese Covered Bridge.",
];

export default function EnPage() {
  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
            English edition
          </p>
          <SectionHeader label="Hoi An Parish" title="Mass Times & Visitor Guide" />
          <p className="max-w-2xl font-body text-base leading-relaxed text-neutral-600">
            Hoi An Parish belongs to the Diocese of Da Nang. Our church stands in the heart of the
            ancient town — one of the earliest centers of Catholic mission in Vietnam. This page
            provides essential information for visitors and foreign Catholics.
          </p>
        </div>
      </section>

      {/* Mass times */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <h2 className="mb-6 font-serif text-3xl font-bold">Mass Schedule</h2>
          <div className="overflow-x-auto border border-ink">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink bg-ink text-paper">
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">Day</th>
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">Mass times</th>
                </tr>
              </thead>
              <tbody>
                {GIO_LE_THUONG_KY.map((g) => (
                  <tr key={g.ngay} className="border-b border-muted last:border-b-0 hover:bg-neutral-100">
                    <td className="px-4 py-4 font-sans text-sm font-semibold uppercase tracking-wider">
                      {EN_DAYS[g.ngay] ?? g.ngay}
                    </td>
                    <td className="px-4 py-4 font-mono text-xl font-medium">{g.gio.join(" · ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
            * Sample schedule — please confirm with the parish office. Masses are in Vietnamese;
            confession is available 30 minutes before each Mass.
          </p>
        </div>
      </section>

      {/* Visitor guide */}
      <section className="newsprint-texture border-b border-ink bg-ink text-paper">
        <div className="mx-auto max-w-screen-xl px-4 py-16">
          <SectionHeader label="For visitors" title="Visiting the church" invert />
          <ol className="max-w-3xl space-y-4">
            {VISITOR_RULES.map((rule, i) => (
              <li key={i} className="flex gap-4 border-b border-neutral-700 pb-4 last:border-b-0">
                <span className="font-mono text-2xl font-medium text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-base leading-relaxed text-neutral-400">{rule}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact */}
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 py-12 sm:py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader label="Contact" title="Address & directions" />
            <dl className="space-y-3">
              {[
                ["Address", GIAO_XU.diaChi],
                ["Phone", GIAO_XU.dienThoai],
                ["Email", GIAO_XU.email],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-muted pb-2">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">{k}</dt>
                  <dd className="font-body text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-7">
            <p className="font-body text-base leading-relaxed text-neutral-600">
              From Da Nang, Hoi An is about 30 km south along the coastal road (Vo Nguyen Giap /
              Lac Long Quan). The church is within walking distance of most hotels in the ancient
              town. For urgent pastoral needs (Anointing of the Sick), please call the parish
              office directly.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
              * Sample data — to be confirmed by the parish
            </p>
          </div>
        </div>
      </section>

      <Ornament />
    </>
  );
}
