import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { Badge } from "@/components/ui/badge";
import { Halftone } from "@/components/blocks/article-card";

export const metadata: Metadata = {
  title: "Thư viện",
  description:
    "Thư viện Giáo xứ Hội An: album hình ảnh, video, audio và tài liệu – biểu mẫu.",
};

const ALBUMS = [
  { ten: "Thánh lễ Thêm sức 2026", ngay: "08.2026", soAnh: 45 },
  { ten: "Trại hè giới trẻ 'Ánh Sáng Muối Men'", ngay: "07.2026", soAnh: 120 },
  { ten: "Kiệu Đức Mẹ — Tháng Hoa", ngay: "05.2026", soAnh: 60 },
  { ten: "Tuần Thánh & Phục Sinh 2026", ngay: "04.2026", soAnh: 85 },
];

const VIDEOS = [
  { ten: "Thánh lễ bổn mạng giáo xứ 2026", thoiLuong: "1:42:00" },
  { ten: "Phóng sự: Nhà thờ Hội An giữa lòng phố cổ", thoiLuong: "12:30" },
  { ten: "Bài giảng Chúa nhật XX Thường niên", thoiLuong: "18:45" },
];

const TAI_LIEU = [
  { ten: "Đơn xin Rửa tội", loai: "PDF", capNhat: "01.2026" },
  { ten: "Đơn xin chứng nhận Bí tích", loai: "PDF", capNhat: "01.2026" },
  { ten: "Mẫu đăng ký giáo lý thiếu nhi", loai: "PDF", capNhat: "08.2026" },
  { ten: "Nội quy tham quan nhà thờ", loai: "PDF", capNhat: "03.2026" },
];

export default function ThuVienPage() {
  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label="Thư viện" title="Hình ảnh · Video · Tài liệu" />
          <p className="max-w-2xl font-body text-base leading-relaxed text-neutral-600">
            Tư liệu sinh hoạt giáo xứ được lưu trữ theo năm và sự kiện. Video và audio nhúng từ
            kênh chính thức của giáo xứ.
          </p>
        </div>
      </section>

      {/* Albums */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <h2 className="mb-6 font-serif text-3xl font-bold">Album hình ảnh</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ALBUMS.map((a) => (
              <figure key={a.ten} className="hard-shadow-hover border border-ink bg-paper">
                <Halftone className="h-40 border-0" />
                <figcaption className="border-t border-ink p-4">
                  <p className="font-serif text-lg font-bold leading-snug">{a.ten}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                    {a.ngay} · {a.soAnh} ảnh
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Video + Audio */}
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 lg:grid-cols-12">
          <div className="border-b border-ink p-6 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
            <h2 className="mb-6 font-serif text-3xl font-bold">Video</h2>
            <div className="space-y-4">
              {VIDEOS.map((v) => (
                <div key={v.ten} className="flex items-center gap-4 border border-ink p-4 transition-colors duration-200 hover:bg-neutral-100">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink bg-ink text-paper">
                    <span aria-hidden className="ml-0.5 text-lg">▶</span>
                  </div>
                  <div>
                    <p className="font-serif text-lg font-bold leading-snug">{v.ten}</p>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                      {v.thoiLuong} · YouTube giáo xứ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 sm:p-8 lg:col-span-5">
            <h2 className="mb-6 font-serif text-3xl font-bold">Audio</h2>
            <p className="font-body text-sm leading-relaxed text-neutral-600">
              Thư viện audio (bài giảng, suy niệm, thánh ca) đang được xây dựng. Bản tin audio
              hằng tuần sẽ sớm có mặt.
            </p>
            <div className="mt-4 border border-dashed border-ink p-6 text-center font-mono text-xs uppercase tracking-widest text-neutral-500">
              Sắp ra mắt
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <h2 className="mb-6 font-serif text-3xl font-bold">Tài liệu – Biểu mẫu</h2>
          <div className="overflow-x-auto border border-ink">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink bg-ink text-paper">
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">Tên tài liệu</th>
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">Loại</th>
                  <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">Cập nhật</th>
                </tr>
              </thead>
              <tbody>
                {TAI_LIEU.map((t) => (
                  <tr key={t.ten} className="border-b border-muted last:border-b-0 hover:bg-neutral-100">
                    <td className="px-4 py-3 font-body text-sm">{t.ten}</td>
                    <td className="px-4 py-3">
                      <Badge>{t.loai}</Badge>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-neutral-500">
                      {t.capNhat}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
            * Tệp tải về sẽ được bổ sung khi văn phòng cung cấp bản chính thức
          </p>
        </div>
      </section>

      <Ornament />
    </>
  );
}
