import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import {
  CHUONG_TRINH_DONG_GOP,
  HINH_THUC_DONG_GOP,
  BAO_CAO_THU_CHI,
  CANH_BAO_GIA_MAO,
} from "@/lib/data/dong-gop";

export const metadata: Metadata = {
  title: "Đồng hành & Đóng góp",
  description:
    "Các chương trình quyên góp, hình thức đóng góp và báo cáo thu–chi minh bạch của Giáo xứ Hội An.",
};

export default function DongHanhPage() {
  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label="Đồng hành" title="Quyên góp & Đóng góp" />
          <p className="max-w-2xl font-body text-base leading-relaxed text-neutral-600">
            Mọi đóng góp của cộng đoàn được ghi nhận và báo cáo minh bạch. Thông tin tài khoản
            chính thức do văn phòng giáo xứ công bố.
          </p>
          <div className="mt-6 max-w-2xl border-2 border-accent bg-paper p-4">
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-accent">
              ⚠ Cảnh báo giả mạo
            </p>
            <p className="mt-1 font-body text-sm leading-relaxed">{CANH_BAO_GIA_MAO}</p>
          </div>
        </div>
      </section>

      {/* Campaigns */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <h2 className="mb-6 font-serif text-3xl font-bold">Chương trình đang thực hiện</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {CHUONG_TRINH_DONG_GOP.map((cd) => (
              <div key={cd.ten} className="hard-shadow-hover border border-ink bg-paper p-6">
                <h3 className="font-serif text-2xl font-bold">{cd.ten}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-neutral-600">{cd.moTa}</p>
                <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-muted pt-4">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                      Đã đạt
                    </dt>
                    <dd className="font-mono text-xl font-medium text-accent">{cd.daDat}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                      Mục tiêu
                    </dt>
                    <dd className="font-mono text-xl font-medium">{cd.mucTieu}</dd>
                  </div>
                </dl>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                  Thời hạn: {cd.thoiHan}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methods — inverted */}
      <section className="newsprint-texture border-b border-ink bg-ink text-paper">
        <div className="mx-auto max-w-screen-xl px-4 py-16">
          <SectionHeader label="Cách đóng góp" title="Hình thức đóng góp" invert />
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
            * Thông tin tài khoản bản mẫu — văn phòng giáo xứ sẽ công bố số chính thức
          </p>
        </div>
      </section>

      {/* Reports */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <h2 className="mb-6 font-serif text-3xl font-bold">Báo cáo thu–chi</h2>
          <div className="overflow-x-auto border border-ink">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink bg-ink text-paper">
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">Kỳ</th>
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">Thu</th>
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">Chi</th>
                  <th className="hidden px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest sm:table-cell">
                    Nội dung chính
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
            * Số liệu bản mẫu — báo cáo chính thức do Hội đồng Mục vụ xác nhận
          </p>
        </div>
      </section>

      <Ornament />
    </>
  );
}
