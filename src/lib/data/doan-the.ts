/** DỮ LIỆU MẪU — cần giáo xứ xác nhận trước khi xuất bản (PRODUCT.md §19) */

interface DoanThe {
  slug: string;
  ten: string;
  boNang?: string;
  moTa: string;
  lichSinhHoat: string;
  phuTrach: string;
}

export const DOAN_THE: DoanThe[] = [
  {
    slug: "thieu-nhi-thanh-the",
    ten: "Thiếu nhi Thánh Thể",
    boNang: "Chúa Giêsu Hài Đồng",
    moTa: "Phong trào giáo dục đức tin cho thiếu nhi qua cầu nguyện, rước lễ và hy sinh.",
    lichSinhHoat: "Chúa nhật hằng tuần, 08:00 – 10:00",
    phuTrach: "Ban Giáo lý thiếu nhi",
  },
  {
    slug: "gioi-tre",
    ten: "Giới trẻ",
    boNang: "Thánh Gioan Phaolô II",
    moTa: "Sân chơi đức tin cho người trẻ: học hỏi Lời Chúa, thiện nguyện và sinh hoạt văn hóa.",
    lichSinhHoat: "Thứ Bảy tuần 1 và tuần 3 hằng tháng, 19:30",
    phuTrach: "Ban Mục vụ giới trẻ",
  },
  {
    slug: "ca-doan",
    ten: "Ca đoàn",
    boNang: "Thánh nữ Cêcilia",
    moTa: "Phục vụ thánh nhạc trong các Thánh lễ và đại lễ của giáo xứ.",
    lichSinhHoat: "Tập hát thứ Tư và thứ Sáu hằng tuần, 19:30",
    phuTrach: "Ca trưởng",
  },
  {
    slug: "caritas",
    ten: "Caritas – Bác ái",
    moTa: "Thăm viếng người nghèo, bệnh nhân; điều phối cứu trợ và quà tặng các dịp lễ.",
    lichSinhHoat: "Theo chiến dịch; họp định kỳ hằng tháng",
    phuTrach: "Ban Bác ái xã hội",
  },
  {
    slug: "hoi-man-coi",
    ten: "Hội Mân Côi",
    moTa: "Cầu nguyện kinh Mân Côi hằng ngày, đọc kinh luân phiên tại các gia đình.",
    lichSinhHoat: "Trước lễ chiều hằng ngày",
    phuTrach: "Ban điều hành Hội",
  },
  {
    slug: "legio-mariae",
    ten: "Legio Mariae",
    moTa: "Tông đồ giáo dân theo tinh thần Đức Mẹ: thăm viếng, truyền giáo và phục vụ.",
    lichSinhHoat: "Họp phiên hằng tuần theo từng praesidium",
    phuTrach: "Ban điều hành Legio",
  },
];

interface KhoaGiaoLy {
  slug: string;
  ten: string;
  doiTuong: string;
  lichHoc: string;
  thoiGianDangKy: string;
  trangThai: "Dang mở" | "Sắp khai giảng" | "Đã đầy";
}

export const KHOA_GIAO_LY: KhoaGiaoLy[] = [
  {
    slug: "giao-ly-thieu-nhi",
    ten: "Giáo lý thiếu nhi",
    doiTuong: "7 – 15 tuổi",
    lichHoc: "Chúa nhật hằng tuần, 08:00 – 10:00",
    thoiGianDangKy: "Tháng 8 hằng năm",
    trangThai: "Dang mở",
  },
  {
    slug: "giao-ly-du-tong",
    ten: "Giáo lý dự tòng",
    doiTuong: "Người lớn muốn tìm hiểu và gia nhập đạo",
    lichHoc: "Thứ Ba và thứ Năm, 19:00 – 20:30",
    thoiGianDangKy: "Liên tục trong năm",
    trangThai: "Dang mở",
  },
  {
    slug: "giao-ly-hon-nhan",
    ten: "Giáo lý hôn nhân",
    doiTuong: "Các đôi chuẩn bị kết hôn",
    lichHoc: "Theo khóa, 8 buổi",
    thoiGianDangKy: "Trước khóa 2 tuần",
    trangThai: "Sắp khai giảng",
  },
];
