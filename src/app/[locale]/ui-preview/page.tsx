import { notFound } from "next/navigation";
import { Ticker } from "@/components/ui/ticker";
import { ArticleCard } from "@/components/blocks/article-card";
import { EditorialPlate } from "@/components/ui/editorial-plate";
import type { BaiViet } from "@/lib/article-types";

const article: BaiViet = {
  locale: "vi", kind: "bai-viet", status: "draft", slug: "ui-fixture",
  title: "Nội dung kiểm tra giao diện: Cộng đoàn cùng chuẩn bị ngày lễ và sinh hoạt giáo xứ",
  category: "thong-bao", date: "2026-09-08", author: "Dữ liệu kiểm tra — không xuất bản",
  tags: [], content: "", summary: "Dữ liệu kiểm tra giao diện, không phải thông báo thật. Nội dung dài giúp kiểm tra chữ tiếng Việt, xuống dòng trên điện thoại và trạng thái bàn phím mà không thay đổi dữ liệu giáo xứ.",
};

export default function UIPreview() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <>
    <h1 className="p-4 font-sans text-lg">Kiểm tra giao diện cục bộ — dữ liệu mẫu</h1>
    <Ticker items={[article.summary, "Thông báo kiểm tra thứ hai với nội dung dài để xác minh tất cả thông tin đều đọc được khi giảm chuyển động."]} />
    <div className="mx-auto grid max-w-screen-xl gap-6 p-4 lg:grid-cols-12">
      <div className="min-w-0 lg:col-span-7"><ArticleCard bai={article} href="/tin-tuc" featured /><EditorialPlate title={article.title} label="Bản tin kiểm tra" marker="2026" caption="Dữ liệu mẫu" className="mt-4 h-56" /></div>
      <div className="min-w-0 lg:col-span-5"><ArticleCard bai={{...article, title: "Mẫu tin ngắn để so sánh thứ bậc"}} href="/tin-tuc" /></div>
    </div>
  </>;
}
