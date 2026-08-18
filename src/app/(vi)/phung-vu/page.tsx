import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GIO_LE_THUONG_KY,
  GIO_LE_DAC_BIET,
  GIAI_TOI_CHAU_THANH,
  NGAY_CAP_NHAT_GIO_LE,
} from "@/lib/data/gio-le";

export const metadata: Metadata = {
  title: "Phụng vụ & Bí tích",
  description:
    "Giờ lễ thường kỳ, lịch lễ đặc biệt, giờ giải tội, chầu Thánh Thể và hướng dẫn các Bí tích của Giáo xứ Hội An.",
};

export default function PhungVuPage() {
  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label="Phụng vụ" title="Giờ lễ & cử hành" />
          <p className="max-w-2xl font-body text-base leading-relaxed text-neutral-600">
            Giờ lễ được xác nhận hằng tuần. Nếu có thay đổi đột xuất, giáo xứ sẽ thông báo trên
            trang chủ và tại nhà thờ.
          </p>
        </div>
      </section>

      {/* Mass schedule table */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-serif text-3xl font-bold">Giờ lễ thường kỳ</h2>
            <Badge variant="solid">Đã xác nhận · {NGAY_CAP_NHAT_GIO_LE}</Badge>
          </div>
          <div className="overflow-x-auto border border-ink">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink bg-ink text-paper">
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">Ngày</th>
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">Giờ lễ</th>
                  <th className="hidden px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest sm:table-cell">
                    Ghi chú
                  </th>
                </tr>
              </thead>
              <tbody>
                {GIO_LE_THUONG_KY.map((g) => (
                  <tr key={g.ngay} className="border-b border-muted last:border-b-0 hover:bg-neutral-100">
                    <td className="px-4 py-4 font-sans text-sm font-semibold uppercase tracking-wider">
                      {g.ngay}
                    </td>
                    <td className="px-4 py-4 font-mono text-xl font-medium">{g.gio.join(" · ")}</td>
                    <td className="hidden px-4 py-4 font-body text-sm italic text-neutral-600 sm:table-cell">
                      {g.ghiChu}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
            * Bản mẫu — giờ lễ chính thức do văn phòng giáo xứ công bố
          </p>
        </div>
      </section>

      {/* Special feasts + confession/adoration */}
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 lg:grid-cols-12">
          <div className="border-b border-ink p-6 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
            <h2 className="mb-6 font-serif text-3xl font-bold">Lễ trọng & mùa phụng vụ</h2>
            <div className="space-y-0 border-t border-ink">
              {GIO_LE_DAC_BIET.map((d) => (
                <div key={d.dip} className="border-b border-muted py-4 last:border-b-0">
                  <p className="font-sans text-sm font-bold uppercase tracking-wider">{d.dip}</p>
                  <ul className="mt-1 space-y-1">
                    {d.le.map((l) => (
                      <li key={l} className="font-body text-sm text-neutral-600">
                        — {l}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 sm:p-8 lg:col-span-5">
            <h2 className="mb-6 font-serif text-3xl font-bold">Giải tội & chầu Thánh Thể</h2>
            <div className="space-y-4">
              {GIAI_TOI_CHAU_THANH.map((m) => (
                <div key={m.muc} className="border border-ink p-4">
                  <p className="font-sans text-xs font-bold uppercase tracking-widest">{m.muc}</p>
                  <p className="mt-1 font-body text-sm leading-relaxed">{m.thoiGian}</p>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                    {m.diaDiem}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sacraments overview — inverted */}
      <section className="newsprint-texture border-b border-ink bg-ink text-paper">
        <div className="mx-auto max-w-screen-xl px-4 py-16">
          <SectionHeader label="Bảy Bí tích" title="Hướng dẫn Bí tích" invert />
          <p className="max-w-2xl font-body text-base leading-relaxed text-neutral-400">
            Mỗi Bí tích có điều kiện, hồ sơ và quy trình riêng. Chọn Bí tích bạn quan tâm để xem
            hướng dẫn chi tiết và đầu mối liên hệ.
          </p>
          <div className="mt-8 grid grid-cols-1 border-l border-t border-paper sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Rửa tội", "rua-toi"],
              ["Thêm sức", "them-suc"],
              ["Rước lễ lần đầu", "ruoc-le-lan-dau"],
              ["Hòa giải", "hoa-giai"],
              ["Hôn phối", "hon-phoi"],
              ["Xức dầu bệnh nhân", "xuc-dau-benh-nhan"],
              ["An táng", "an-tang"],
              ["Chứng nhận Bí tích", "chung-nhan"],
            ].map(([ten, slug]) => (
              <Link
                key={slug}
                href={slug === "chung-nhan" ? "/bi-tich#chung-nhan" : `/bi-tich/${slug}`}
                className="group flex min-h-[88px] items-center justify-between border-b border-r border-paper p-4 transition-colors duration-200 hover:bg-paper hover:text-ink"
              >
                <span className="font-serif text-xl font-bold">{ten}</span>
                <span className="font-mono text-xs text-accent">→</span>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/bi-tich" variant="secondary" className="border-paper text-paper hover:bg-paper hover:text-ink">
              Xem tất cả hướng dẫn
            </ButtonLink>
          </div>
        </div>
      </section>

      <Ornament />
    </>
  );
}
