/** DỮ LIỆU MẪU — cần giáo xứ xác nhận trước khi xuất bản (PRODUCT.md §19) */

interface ChienDichDongGop {
  ten: string;
  mucTieu: string;
  daDat: string;
  thoiHan: string;
  moTa: string;
}

// Không có chiến dịch/tổng tiền đã được xác nhận công khai.
export const CHUONG_TRINH_DONG_GOP: ChienDichDongGop[] = [];

export const HINH_THUC_DONG_GOP = [
  {
    hinhThuc: "Chuyển khoản",
    chiTiet: [
      "Thông tin chuyển khoản chưa được giáo xứ xác nhận. Vui lòng liên hệ văn phòng trước khi đóng góp.", 
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

// Chỉ đăng báo cáo có chứng từ và phê duyệt của giáo xứ.
export const BAO_CAO_THU_CHI: { ky: string; thu: string; chi: string; noiDung: string }[] = [];

export const CANH_BAO_GIA_MAO =
  "Giáo xứ chỉ sử dụng tài khoản chính thức do văn phòng công bố. Vui lòng đối chiếu với văn phòng trước khi chuyển khoản các khoản đóng góp lớn.";
