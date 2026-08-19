import Link from "next/link";
import { ArrowRight, Clock, MapPin, Cross, BookOpen, HeartHandshake, GraduationCap } from "lucide-react";
import { Ticker } from "@/components/ui/ticker";
import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArticleCard, Halftone } from "@/components/blocks/article-card";
import { getPublishedArticles } from "@/lib/articles";
import { formatDate } from "@/lib/article-types";
import { GIO_LE_THUONG_KY, NGAY_CAP_NHAT_GIO_LE } from "@/lib/data/gio-le";
import { thongBaoHieuLuc } from "@/lib/data/thong-bao";
import { phungVuHomNay } from "@/lib/data/phung-vu";
import { formatVi } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const QUICK_LINKS = [
  { href: "/phung-vu", label: "Giờ lễ", icon: Clock },
  { href: "/lien-he", label: "Chỉ đường", icon: MapPin },
  { href: "/bi-tich", label: "Bí tích", icon: Cross },
  { href: "/loi-chua", label: "Lời Chúa", icon: BookOpen },
  { href: "/cong-doan", label: "Giáo lý", icon: GraduationCap },
  { href: "/dong-hanh", label: "Đóng góp", icon: HeartHandshake },
];

export default async function HomePage() {
  const homNay = new Date();
  const baiViet = await getPublishedArticles("bai-viet");
  const [tinTieuDiem, ...tinMoi] = baiViet.slice(0, 4);
  const suyNiemMoi = (await getPublishedArticles("suy-niem")).slice(0, 2);
  const thongBao = thongBaoHieuLuc(homNay);
  const phungVu = phungVuHomNay(homNay);

  return (
    <>
      {/* Breaking ticker */}
      {thongBao.length > 0 && (
        <Ticker items={thongBao.map((tb) => `${tb.tieuDe} — ${tb.noiDung}`)} />
      )}

      {/* Hero: 8/4 asymmetric split */}
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 lg:grid-cols-12">
          <div className="border-b border-ink p-6 sm:p-8 lg:col-span-8 lg:border-b-0 lg:border-r">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-500">
              {formatVi(homNay)} · {phungVu.mauPhungVu === "Xanh" ? "Mùa Thường niên" : phungVu.mauPhungVu}
            </p>
            <h2 className="font-serif text-5xl font-black leading-[0.95] tracking-tighter text-ink sm:text-6xl lg:text-8xl">
              Cửa chính
              <br />
              của đức tin
              <br />
              <span className="italic font-bold">giữa lòng phố cổ</span>
            </h2>
            <p className="drop-cap mt-6 max-w-2xl font-body text-base leading-relaxed text-neutral-600 sm:text-lg">
              Giáo xứ Hội An — cộng đoàn đức tin giữa thương cảng xưa, nơi hạt giống Tin Mừng
              được gieo từ những thế kỷ đầu của công cuộc truyền giáo tại Việt Nam. Trang web
              này là cửa chính trực tuyến: giờ lễ, Bí tích, tin tức và lời mời hiệp thông.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/phung-vu">Xem giờ lễ</ButtonLink>
              <ButtonLink href="/lien-he" variant="secondary">
                Chỉ đường đến nhà thờ
              </ButtonLink>
            </div>
          </div>

          {/* Mass times quick column */}
          <aside className="p-6 sm:p-8 lg:col-span-4">
            <div className="mb-4 flex items-center justify-between border-b-2 border-ink pb-2">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest">
                Giờ lễ nhanh
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Cập nhật {NGAY_CAP_NHAT_GIO_LE}
              </span>
            </div>
            <dl>
              {GIO_LE_THUONG_KY.map((g) => (
                <div key={g.ngay} className="border-b border-muted py-3 last:border-b-0">
                  <dt className="font-sans text-xs font-semibold uppercase tracking-widest text-neutral-600">
                    {g.ngay}
                  </dt>
                  <dd className="mt-1 font-mono text-2xl font-medium tracking-tight">
                    {g.gio.join(" · ")}
                  </dd>
                  {g.ghiChu && (
                    <dd className="mt-0.5 font-body text-xs italic text-neutral-500">{g.ghiChu}</dd>
                  )}
                </div>
              ))}
            </dl>
            <Link
              href="/phung-vu"
              className="mt-4 inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-widest decoration-accent decoration-2 underline-offset-4 hover:underline"
            >
              Lịch đầy đủ <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </aside>
        </div>
      </section>

      {/* Liturgy today + quick access */}
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 lg:grid-cols-12">
          <div className="border-b border-ink p-6 sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
              Phụng vụ hôm nay
            </p>
            <div className="flex items-start gap-4">
              <span
                aria-hidden
                className="mt-1 block h-10 w-10 shrink-0 border border-ink"
                style={{ backgroundColor: phungVu.mauHex }}
              />
              <div>
                <p className="font-serif text-2xl font-bold leading-tight">{phungVu.tenLe}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-neutral-500">
                  Màu phụng vụ: {phungVu.mauPhungVu} · Tin Mừng: {phungVu.tinMung}
                </p>
                <Link
                  href="/loi-chua"
                  className="mt-3 inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-widest decoration-accent decoration-2 underline-offset-4 hover:underline"
                >
                  Suy niệm hôm nay <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>

          <nav
            aria-label="Truy cập nhanh"
            className="grid grid-cols-2 border-l border-t border-ink sm:grid-cols-3 lg:col-span-7"
          >
            {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex min-h-[100px] flex-col items-center justify-center gap-2 border-b border-r border-ink p-4 transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                <Icon className="h-6 w-6" strokeWidth={1.5} />
                <span className="font-sans text-xs font-semibold uppercase tracking-widest">
                  {label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* News */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <div className="flex items-end justify-between">
            <SectionHeader label="Tin tức & Sự kiện" title="Tin giáo xứ" className="mb-0" />
            <ButtonLink href="/tin-tuc" variant="link" className="hidden sm:inline-flex">
              Tất cả tin
            </ButtonLink>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {tinTieuDiem && (
              <div className="lg:col-span-7">
                <ArticleCard bai={tinTieuDiem} href={`/tin-tuc/${tinTieuDiem.slug}`} featured />
                <Halftone className="mt-4 h-48" caption="Fig. 1.1 — Sinh hoạt giáo xứ" />
              </div>
            )}
            <div className="space-y-6 lg:col-span-5">
              {tinMoi.map((bai) => (
                <ArticleCard key={bai.slug} bai={bai} href={`/tin-tuc/${bai.slug}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Ornament />

      {/* Inverted section: heritage teaser */}
      <section className="newsprint-texture border-b border-ink bg-ink text-paper">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader label="Di sản đức tin" title="Hội An — cái nôi truyền giáo" invert />
            <p className="font-body text-base leading-relaxed text-neutral-400">
              Từ đầu thế kỷ XVII, các thừa sai Dòng Tên đã đặt chân đến vùng đất này. Dinh trấn
              Thanh Chiêm gần Hội An được xem là cái nôi của chữ Quốc ngữ. Đức tin được gieo
              giữa thương cảng quốc tế và lớn lên qua bao thế hệ.
            </p>
            <ButtonLink href="/giao-xu/lich-su" variant="secondary" className="mt-6 border-paper text-paper hover:bg-paper hover:text-ink">
              Đọc dòng lịch sử
            </ButtonLink>
          </div>
          <div className="grid grid-cols-1 border-l border-t border-paper sm:grid-cols-2 lg:col-span-7">
            {[
              { so: "1615", chu: "Năm các thừa sai đầu tiên đến Đàng Trong" },
              { so: "1617", chu: "Cha Francisco de Pina giảng đạo tại Hội An" },
              { so: "1885", chu: "Nhà thờ Hội An được xây dựng" },
              { so: "1999", chu: "Phố cổ Hội An — Di sản Thế giới UNESCO" },
            ].map((m) => (
              <div key={m.so} className="border-b border-r border-paper p-6">
                <p className="font-mono text-4xl font-medium text-accent">{m.so}</p>
                <p className="mt-2 font-body text-sm text-neutral-400">{m.chu}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reflections */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label="Lời Chúa" title="Suy niệm mới" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {suyNiemMoi.map((bai) => (
              <article key={bai.slug} className="hard-shadow-hover border border-ink bg-paper p-6">
                <Link href={`/loi-chua/${bai.slug}`} className="block">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge>{bai.category === "suy-niem-chua-nhat" ? "Chúa nhật" : "Hằng ngày"}</Badge>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                      {formatDate(bai.date)}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold">{bai.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-neutral-600">
                    {bai.summary}
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                    {bai.author}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
