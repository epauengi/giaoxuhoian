/** Dữ kiện công khai. Địa chỉ/email lấy từ trang Facebook Giáo xứ Hội An; danh bạ Giáo phận ghi địa chỉ khác.
 * Số điện thoại và giờ văn phòng chưa được xác nhận công khai nên để trống.
 */
export const GIAO_XU: {
  boNang: string; giaoHat: string; giaoPhan: string; diaChi: string;
  dienThoai: string; email: string; gioVanPhong: { buoi: string; thoiGian: string }[]; gioiThieu: string;
} = {
  boNang: "Thánh Tâm Chúa Giêsu",
  giaoHat: "Hội An",
  giaoPhan: "Đà Nẵng",
  diaChi: "106 Nguyễn Trường Tộ, phường Cẩm Phô, Hội An",
  dienThoai: "",
  email: "giaoxuhoian0706@gmail.com",
  gioVanPhong: [],
  gioiThieu:
    "Giáo xứ Hội An thuộc Giáo hạt Hội An, Giáo phận Đà Nẵng. Cộng đoàn Công giáo tại Hội An gắn với buổi đầu truyền giáo ở Đàng Trong; nhà thờ hiện nay được xây dựng năm 1965 trên nền nhà thờ năm 1935.",
};

export const CHA_XU = [
  { hoTen: "Lm. Giuse Nguyễn Văn Thú", vaiTro: "Quản xứ", nhiemKy: "Nhận xứ năm 2020", ghiChu: "Theo danh bạ Giáo phận Đà Nẵng; cần đối chiếu trước khi xuất bản lâu dài." },
];

export const HOI_DONG_MUC_VU: { hoTen: string; vaiTro: string }[] = [];
export const GIAO_KHU: { ten: string; khuVuc: string; boNang: string }[] = [];

export const DONG_THOI_GIAN = [
  { nam: "18.01.1615", suKien: "Phái đoàn Dòng Tên do cha Francesco Buzomi dẫn đầu đến Cửa Hàn, sau đó đến Hội An truyền giáo." },
  { nam: "1617", suKien: "Cha Francisco de Pina đến Đàng Trong và hoạt động truyền giáo tại vùng Hội An." },
  { nam: "1672", suKien: "Đức cha Lambert de la Motte tổ chức Công nghị tại Hội An." },
  { nam: "1935", suKien: "Cố Pierre Auguste Gallioz xây nhà thờ Hội An bằng gạch đá; giáo xứ ghi nhận đây là năm thành lập." },
  { nam: "1965", suKien: "Cha Giuse Lê Văn Ly xây nhà thờ mới trên nền nhà thờ năm 1935." },
  { nam: "2015", suKien: "Giáo xứ mừng 400 năm Tin Mừng đến Hội An." },
  { nam: "2020", suKien: "Cha Giuse Nguyễn Văn Thú nhận xứ theo lược sử/danh bạ Giáo phận Đà Nẵng." },
];
