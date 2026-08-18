import { NextResponse } from "next/server";

const CHU_DE = ["bi-tich", "giao-ly", "xin-le", "tham-quan", "truyen-thong", "khan-cap", "khac"];

/**
 * Nhận biểu mẫu câu hỏi / ý nguyện.
 * Chưa có DB: ghi log phía server để không mất dữ liệu; nối DB ở giai đoạn sau.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const hoTen = String(body.hoTen ?? "").trim();
  const lienHe = String(body.lienHe ?? "").trim();
  const chuDe = String(body.chuDe ?? "");
  const noiDung = String(body.noiDung ?? "").trim();
  const website = String(body.website ?? ""); // honeypot

  if (website) {
    // Spam bot: giả vờ thành công
    return NextResponse.json({ ok: true });
  }
  if (!hoTen || !noiDung || !CHU_DE.includes(chuDe)) {
    return NextResponse.json(
      { ok: false, error: "Vui lòng điền họ tên, chủ đề và nội dung." },
      { status: 400 }
    );
  }
  if (noiDung.length > 5000) {
    return NextResponse.json({ ok: false, error: "Nội dung quá dài (tối đa 5000 ký tự)." }, { status: 400 });
  }

  // TODO(DB): lưu vào bảng bieu_mau_gui_den khi có database
  console.log("[bieu-mau]", JSON.stringify({ hoTen, lienHe, chuDe, noiDung, nhan: new Date().toISOString() }));

  return NextResponse.json({ ok: true });
}
