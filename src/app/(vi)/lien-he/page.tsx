import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { BieuMauForm } from "@/components/blocks/bieu-mau-form";
import { GIAO_XU } from "@/lib/data/giao-xu";

export const metadata: Metadata = {
  title: "Liên hệ & Chỉ đường",
  description:
    "Địa chỉ, điện thoại, bản đồ chỉ đường đến nhà thờ Giáo xứ Hội An và biểu mẫu gửi câu hỏi, ý nguyện.",
};

export default async function LienHePage({
  searchParams,
}: {
  searchParams: Promise<{ "khan-cap"?: string; "chu-de"?: string }>;
}) {
  const sp = await searchParams;
  const defaultChuDe = sp["khan-cap"] ? "khan-cap" : sp["chu-de"];

  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label="Đồng hành" title="Liên hệ & Chỉ đường" />
          {sp["khan-cap"] && (
            <div className="mb-6 max-w-2xl border-2 border-accent bg-paper p-4">
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-accent">
                Nhu cầu khẩn cấp
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed">
                Xức dầu bệnh nhân hoặc báo tang: vui lòng gọi trực tiếp số điện thoại giáo xứ
                dưới đây — không chờ phản hồi qua biểu mẫu.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact info + map */}
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 lg:grid-cols-12">
          <div className="border-b border-ink p-6 sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r">
            <h2 className="mb-6 font-serif text-3xl font-bold">Thông tin liên hệ</h2>
            <ul className="space-y-4">
              {[
                { icon: MapPin, label: "Địa chỉ", value: GIAO_XU.diaChi },
                { icon: Phone, label: "Điện thoại", value: `${GIAO_XU.dienThoai} (Văn phòng)` },
                { icon: Mail, label: "Email", value: GIAO_XU.email },
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
                    Giờ văn phòng
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
              * Bản mẫu — cần giáo xứ xác nhận
            </p>
          </div>

          <div className="p-6 sm:p-8 lg:col-span-7">
            <h2 className="mb-6 font-serif text-3xl font-bold">Bản đồ & chỉ đường</h2>
            <div className="relative h-72 border border-ink sm:h-96">
              <iframe
                title="Bản đồ Nhà thờ Giáo xứ Hội An"
                src="https://www.google.com/maps?q=Nh%C3%A0%20th%E1%BB%9D%20Gi%C3%A1o%20x%E1%BB%A9%20H%E1%BB%99i%20An%2C%20106%20Nguy%E1%BB%85n%20Tr%C6%B0%E1%BB%9Dng%20T%E1%BB%99%2C%20H%E1%BB%99i%20An&output=embed"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
              Fig. 4.1 — Nhà thờ nằm giữa trung tâm phố cổ Hội An, gần Chùa Cầu
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 py-12 sm:py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader label="Biểu mẫu" title="Gửi câu hỏi / ý nguyện" />
            <p className="font-body text-sm leading-relaxed text-neutral-600">
              Ý nguyện được giữ riêng tư mặc định và chỉ công khai khi bạn đồng ý. Với nhu cầu
              khẩn cấp (xức dầu, báo tang), hãy gọi điện trực tiếp.
            </p>
          </div>
          <div className="relative lg:col-span-8">
            <BieuMauForm defaultChuDe={defaultChuDe} />
          </div>
        </div>
      </section>

      <Ornament />
    </>
  );
}
