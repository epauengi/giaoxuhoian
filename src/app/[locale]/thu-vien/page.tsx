import { Video } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { Badge } from "@/components/ui/badge";
import { EditorialPlate } from "@/components/ui/editorial-plate";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = "vi" as const;
  return localizedPageMetadata(locale, "Thư viện", "Thư viện Giáo xứ Hội An: album hình ảnh, video, audio và tài liệu – biểu mẫu.", "/thu-vien");
}

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

export default async function ThuVienPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = "vi" as const;
  const p = getDictionary(locale).page.library;
  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label={p.label} title={p.title} as="h1" />
          <p className="max-w-2xl font-body text-base leading-relaxed text-neutral-600">Tư liệu sinh hoạt giáo xứ được lưu trữ theo năm và sự kiện. Video và audio nhúng từ kênh chính thức của giáo xứ.</p>
        </div>
      </section>

      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <h2 className="mb-6 font-serif text-3xl font-bold">{p.albums}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ALBUMS.map((a, index) => <EditorialPlate key={a.ten} title={a.ten} label={a.ngay} marker={String(index + 1).padStart(2, "0")} caption={`${a.soAnh} ${p.photos}`} className="min-h-64" />)}
          </div>
        </div>
      </section>

      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 lg:grid-cols-12">
          <div className="border-b border-ink p-6 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
            <h2 className="mb-6 font-serif text-3xl font-bold">{p.video}</h2>
            <div className="space-y-4">
              {VIDEOS.map((v) => (
                <div key={v.ten} className="flex items-center gap-4 border border-ink p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink bg-ink text-paper"><Video aria-hidden className="h-5 w-5" strokeWidth={1.5} /></div>
                  <div><p className="font-serif text-lg font-bold leading-snug">{v.ten}</p><p className="font-mono text-xs uppercase tracking-widest text-neutral-500">{v.thoiLuong} · {p.parishYoutube}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 sm:p-8 lg:col-span-5">
            <h2 className="mb-6 font-serif text-3xl font-bold">{p.audio}</h2>
            <p className="font-body text-sm leading-relaxed text-neutral-600">{p.audioDescription}</p>
            <div className="mt-4 border border-dashed border-ink p-6 text-center font-mono text-xs uppercase tracking-widest text-neutral-500">{p.comingSoon}</div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <h2 className="mb-6 font-serif text-3xl font-bold">{p.documents}</h2>
          <div className="overflow-x-auto border border-ink">
            <table className="w-full border-collapse text-left">
              <thead><tr className="border-b-2 border-ink bg-ink text-paper"><th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">{p.documentName}</th><th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">{p.type}</th><th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest">{p.updated}</th></tr></thead>
              <tbody>{TAI_LIEU.map((t) => <tr key={t.ten} className="border-b border-muted last:border-b-0"><td className="px-4 py-3 font-body text-sm">{t.ten}</td><td className="px-4 py-3"><Badge>{t.loai}</Badge></td><td className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-neutral-500">{t.capNhat}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-neutral-500">{p.template}</p>
        </div>
      </section>
      <Ornament />
    </>
  );
}
