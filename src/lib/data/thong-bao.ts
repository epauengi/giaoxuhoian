/** DỮ LIỆU MẪU — cần giáo xứ xác nhận trước khi xuất bản (PRODUCT.md §19) */

interface ThongBao {
  id: string;
  tieuDe: string;
  noiDung: string;
  ngayDang: string; // ISO
  ngayHetHan: string; // ISO — sau ngày này không còn nổi bật
  uuTien: "khan" | "thuong";
}

// Không đăng thông báo mẫu; chỉ hiển thị nội dung đã được văn phòng xác nhận.
export const THONG_BAO: ThongBao[] = [];

/** Chỉ trả thông báo còn hiệu lực; không hồi sinh thông báo đã hết hạn. */
export function thongBaoHieuLuc(homNay: Date = new Date()): ThongBao[] {
  return THONG_BAO.filter((tb) => new Date(tb.ngayHetHan) >= homNay);
}
