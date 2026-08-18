/** DỮ LIỆU MẪU — cần giáo xứ xác nhận trước khi xuất bản (PRODUCT.md §19) */

interface ChienDichDongGop {
  ten: string;
  mucTieu: string;
  daDat: string;
  thoiHan: string;
  moTa: string;
}

export const CHUONG_TRINH_DONG_GOP: ChienDichDongGop[] = [
  {
    ten: "Trùng tu tháp chuông",
    mucTieu: "500.000.000 ₫",
    daDat: "320.000.000 ₫",
    thoiHan: "31.12.2026",
    moTa: "Tu bổ tháp chuông nhà thờ đã xuống cấp sau hơn 60 năm.",
  },
  {
    ten: "Quà Giáng Sinh cho người nghèo",
    mucTieu: "50.000.000 ₫",
    daDat: "12.000.000 ₫",
    thoiHan: "20.12.2026",
    moTa: "200 phần quà cho gia đình khó khăn trong và ngoài giáo xứ.",
  },
];

export const HINH_THUC_DONG_GOP = [
  {
    hinhThuc: "Chuyển khoản",
    chiTiet: [
      "Ngân hàng: (đang cập nhật)",
      "Số tài khoản: (đang cập nhật)",
      "Chủ tài khoản: Giáo xứ Hội An",
      "Nội dung: [Họ tên] – [mục đích đóng góp]",
    ],
  },
  {
    hinhThuc: "Trực tiếp",
    chiTiet: ["Văn phòng giáo xứ — giờ hành chính", "Hòm công đức cuối nhà thờ"],
  },
  {
    hinhThuc: "Hiện vật / tình nguyện",
    chiTiet: ["Liên hệ văn phòng hoặc ban Caritas để được hướng dẫn"],
  },
];

export const BAO_CAO_THU_CHI = [
  { ky: "Quý II/2026", thu: "185.000.000 ₫", chi: "162.000.000 ₫", noiDung: "Trùng tu tháp chuông & bác ái" },
  { ky: "Quý I/2026", thu: "210.000.000 ₫", chi: "198.000.000 ₫", noiDung: "Quà Tết & bảo trì nhà thờ" },
];

export const CANH_BAO_GIA_MAO =
  "Giáo xứ chỉ sử dụng tài khoản chính thức do văn phòng công bố. Vui lòng đối chiếu với văn phòng trước khi chuyển khoản các khoản đóng góp lớn.";
