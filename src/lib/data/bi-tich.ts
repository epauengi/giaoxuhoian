/** DỮ LIỆU MẪU — cần giáo xứ xác nhận trước khi xuất bản (PRODUCT.md §19) */

interface BiTich {
  slug: string;
  ten: string;
  tenLatinh?: string;
  tomTat: string;
  dieuKien: string[];
  hoSo: string[];
  quyTrinh: string[];
  lich?: string;
  lienHe: string;
}

export const BI_TICH: BiTich[] = [
  {
    slug: "rua-toi",
    ten: "Rửa tội",
    tenLatinh: "Baptisma",
    tomTat:
      "Bí tích khai mở đời sống Kitô hữu, gia nhập Hội Thánh qua nước và Thánh Thần.",
    dieuKien: [
      "Trẻ em: có cha mẹ hoặc người giám hộ đồng ý",
      "Người lớn: hoàn thành giáo lý dự tòng",
      "Người đỡ đầu đã lãnh nhận các Bí tích khai tâm",
    ],
    hoSo: [
      "Đơn xin Rửa tội (theo mẫu văn phòng)",
      "Bản sao giấy khai sinh",
      "Giấy chứng nhận người đỡ đầu từ giáo xứ của họ",
    ],
    quyTrinh: [
      "Đăng ký tại văn phòng giáo xứ trước ít nhất 2 tuần",
      "Tham dự buổi hướng dẫn dành cho cha mẹ và người đỡ đầu",
      "Cử hành Bí tích theo lịch hằng tháng",
    ],
    lich: "Chúa nhật tuần 2 hằng tháng, sau lễ 07:00",
    lienHe: "Văn phòng giáo xứ — giờ hành chính",
  },
  {
    slug: "them-suc",
    ten: "Thêm sức",
    tenLatinh: "Confirmatio",
    tomTat:
      "Bí tích kiện toàn ơn Rửa tội, ban Chúa Thánh Thần để làm chứng cho đức tin.",
    dieuKien: ["Đã Rửa tội và Rước lễ lần đầu", "Hoàn thành chương trình giáo lý Thêm sức"],
    hoSo: ["Giấy chứng nhận Rửa tội", "Đơn đăng ký theo lớp giáo lý"],
    quyTrinh: [
      "Ghi danh lớp giáo lý đầu niên khóa",
      "Học giáo lý và khảo kinh theo lịch",
      "Lãnh nhận Bí tích do Đức Giám mục cử hành",
    ],
    lich: "Theo niên khóa giáo lý",
    lienHe: "Ban Giáo lý thiếu nhi",
  },
  {
    slug: "ruoc-le-lan-dau",
    ten: "Rước lễ lần đầu",
    tenLatinh: "Eucharistia",
    tomTat: "Lần đầu tiên lãnh nhận Mình và Máu Thánh Chúa Kitô trong Thánh lễ.",
    dieuKien: ["Đã Rửa tội", "Hoàn thành giáo lý Rước lễ lần đầu", "Xưng tội trước ngày rước lễ"],
    hoSo: ["Giấy chứng nhận Rửa tội", "Đơn đăng ký theo lớp giáo lý"],
    quyTrinh: ["Ghi danh lớp giáo lý", "Học và khảo kinh", "Tĩnh tâm và xưng tội", "Cử hành trong Thánh lễ trọng thể"],
    lich: "Theo niên khóa giáo lý",
    lienHe: "Ban Giáo lý thiếu nhi",
  },
  {
    slug: "hoa-giai",
    ten: "Hòa giải",
    tenLatinh: "Paenitentia",
    tomTat: "Bí tích tha tội, giao hòa với Thiên Chúa và Hội Thánh.",
    dieuKien: ["Mọi tín hữu đã đến tuổi khôn"],
    hoSo: [],
    quyTrinh: ["Xét mình", "Ăn năn dốc lòng chừa", "Xưng tội", "Nhận phép tha và làm việc đền tội"],
    lich: "30 phút trước mỗi Thánh lễ, hoặc hẹn riêng qua văn phòng",
    lienHe: "Văn phòng giáo xứ",
  },
  {
    slug: "hon-phoi",
    ten: "Hôn phối",
    tenLatinh: "Matrimonium",
    tomTat: "Giao ước hôn nhân giữa một người nam và một người nữ, được nâng lên hàng Bí tích.",
    dieuKien: [
      "Cả hai còn tự do, chưa kết hôn",
      "Hoàn thành khóa giáo lý hôn nhân",
      "Không mắc ngăn trở theo Giáo luật",
    ],
    hoSo: [
      "Giấy chứng nhận Rửa tội và Thêm sức (mới cấp trong 6 tháng)",
      "Giấy chứng nhận hoàn thành giáo lý hôn nhân",
      "Giấy giới thiệu của giáo xứ nơi cư ngụ",
      "Giấy đăng ký kết hôn dân sự (nếu có)",
    ],
    quyTrinh: [
      "Gặp cha xứ trước ngày dự định cưới ít nhất 3 tháng",
      "Học giáo lý hôn nhân theo khóa",
      "Rao hôn phối tại giáo xứ đôi bên",
      "Chuẩn bị nghi thức và đặt lịch Thánh lễ hôn phối",
    ],
    lich: "Đặt lịch qua văn phòng",
    lienHe: "Cha xứ — qua văn phòng giáo xứ",
  },
  {
    slug: "xuc-dau-benh-nhan",
    ten: "Xức dầu bệnh nhân",
    tenLatinh: "Unctio Infirmorum",
    tomTat: "Bí tích nâng đỡ bệnh nhân và người cao tuổi trong cơn nguy tử hoặc bệnh nặng.",
    dieuKien: ["Bệnh nặng, người cao tuổi yếu sức, hoặc trước ca phẫu thuật lớn"],
    hoSo: [],
    quyTrinh: [
      "Liên hệ văn phòng hoặc số khẩn cấp của giáo xứ",
      "Cha xứ đến tận nơi cử hành Bí tích",
      "Trường hợp nguy tử: gọi ngay, không chờ giờ hành chính",
    ],
    lich: "Bất cứ lúc nào khi cần",
    lienHe: "Số khẩn cấp giáo xứ (xem trang Liên hệ)",
  },
  {
    slug: "an-tang",
    ten: "An táng",
    tenLatinh: "Exsequiae",
    tomTat: "Nghi thức phó dâng người qua đời cho lòng thương xót Chúa và tiễn biệt trong hy vọng phục sinh.",
    dieuKien: ["Người qua đời là tín hữu Công giáo"],
    hoSo: ["Giấy báo tử (nếu có)", "Thông tin người thân để liên hệ"],
    quyTrinh: [
      "Gia đình báo tang cho giáo khu và văn phòng giáo xứ",
      "Cha xứ thăm viếng và cầu nguyện",
      "Sắp xếp Thánh lễ an táng và nghi thức tại nghĩa trang",
    ],
    lich: "Theo sắp xếp với gia đình",
    lienHe: "Văn phòng giáo xứ / Trưởng giáo khu",
  },
];
