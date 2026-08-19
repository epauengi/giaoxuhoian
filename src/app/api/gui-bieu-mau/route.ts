import { NextResponse } from "next/server";

const CHU_DE = ["bi-tich", "giao-ly", "xin-le", "tham-quan", "truyen-thong", "khan-cap", "khac"] as const;
const ERROR_MESSAGES = { invalid: "Dữ liệu không hợp lệ.", required: "Vui lòng điền họ tên, chủ đề và nội dung.", long: "Nội dung quá dài (tối đa 5000 ký tự)." };

/**
 * Nhận biểu mẫu câu hỏi / ý nguyện.
 * Chưa có DB: ghi log phía server để không mất dữ liệu; nối DB ở giai đoạn sau.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: ERROR_MESSAGES.invalid }, { status: 400 });
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
  if (!hoTen || !noiDung || !(CHU_DE as readonly string[]).includes(chuDe)) {
    return NextResponse.json(
      { ok: false, error: ERROR_MESSAGES.required },
      { status: 400 }
    );
  }
  if (noiDung.length > 5000) {
    return NextResponse.json({ ok: false, error: ERROR_MESSAGES.long }, { status: 400 });
  }

  // TODO(DB): lưu vào bảng bieu_mau_gui_den khi có database
  console.log("[bieu-mau]", JSON.stringify({ hoTen, lienHe, chuDe, noiDung, nhan: new Date().toISOString() }));

  return NextResponse.json({ ok: true });
}
