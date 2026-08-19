import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { DOAN_THE, KHOA_GIAO_LY } from "@/lib/data/doan-the";

export const metadata: Metadata = {
  title: "Cộng đoàn & Giáo lý",
  description:
    "Các đoàn thể và khóa giáo lý của Giáo xứ Hội An: Thiếu nhi Thánh Thể, Giới trẻ, Ca đoàn, Caritas và các lớp giáo lý.",
};

export default function CongDoanPage() {
  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label="Cộng đoàn" title="Đoàn thể & Giáo lý" />
          <p className="max-w-2xl font-body text-base leading-relaxed text-neutral-600">
            Đời sống giáo xứ được nuôi dưỡng bởi các đoàn thể và chương trình giáo lý. Mỗi nhóm
            có lịch sinh hoạt và người phụ trách riêng — liên hệ văn phòng để tham gia.
          </p>
        </div>
      </section>

      {/* Organizations */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <h2 className="mb-6 font-serif text-3xl font-bold">Các đoàn thể</h2>
          <div className="grid grid-cols-1 border-l border-t border-ink md:grid-cols-2 lg:grid-cols-3">
            {DOAN_THE.map((dt) => (
              <div key={dt.slug} className="border-b border-r border-ink p-6 transition-colors duration-200 hover:bg-neutral-100">
                <p className="font-serif text-2xl font-bold">{dt.ten}</p>
                {dt.boNang && (
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-accent">
                    Bổn mạng: {dt.boNang}
                  </p>
                )}
                <p className="mt-3 font-body text-sm leading-relaxed text-neutral-600">{dt.moTa}</p>
                <dl className="mt-4 space-y-1 border-t border-muted pt-3">
                  <div className="flex gap-2">
                    <dt className="font-sans text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                      Sinh hoạt:
                    </dt>
                    <dd className="font-body text-sm">{dt.lichSinhHoat}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-sans text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                      Phụ trách:
                    </dt>
                    <dd className="font-body text-sm">{dt.phuTrach}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catechism courses — inverted */}
      <section className="newsprint-texture border-b border-ink bg-ink text-paper">
        <div className="mx-auto max-w-screen-xl px-4 py-16">
          <SectionHeader label="Giáo lý" title="Các khóa giáo lý" invert />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {KHOA_GIAO_LY.map((k) => (
              <div key={k.slug} className="border border-paper p-6">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-2xl font-bold">{k.ten}</h3>
                  <Badge variant={k.trangThai === "Dang mở" ? "accent" : "outline"} className={k.trangThai !== "Dang mở" ? "border-paper text-paper" : ""}>
                    {k.trangThai}
                  </Badge>
                </div>
                <dl className="mt-4 space-y-2 font-body text-sm text-neutral-400">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest">Đối tượng</dt>
                    <dd>{k.doiTuong}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest">Lịch học</dt>
                    <dd>{k.lichHoc}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest">Đăng ký</dt>
                    <dd>{k.thoiGianDangKy}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/lien-he?chu-de=giao-ly" variant="secondary" className="border-paper text-paper hover:bg-paper hover:text-ink">
              Đăng ký / hỏi về giáo lý
            </ButtonLink>
          </div>
        </div>
      </section>

      <Ornament />
    </>
  );
}
