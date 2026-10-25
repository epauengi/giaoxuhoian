import type { BaiViet } from "@/lib/article-types";
import type { Locale } from "@/lib/i18n/config";
import { translate } from "@/lib/i18n/content";

export interface ArticleEnTranslation {
  title: string;
  summary: string;
  content: string;
  sourceTitle: string;
  sourceSummary: string;
  sourceContent: string;
}

const AUTHOR_MAP: Record<string, string> = {
  "Ban Mục vụ giới trẻ": "Youth Pastoral Committee",
  "Văn phòng giáo xứ": "Parish Office",
  "Ban Truyền thông": "Communications Committee",
  "Ban Giáo lý": "Catechetical Committee",
  "Ban Caritas": "Caritas Committee",
};

export const articlesEn: Record<string, ArticleEnTranslation> = {
  "thu-tu-tuan-20": {
    title: "Laborers in the Vineyard: The Generosity of God",
    summary:
      "Reflection for Wednesday of the 20th Week in Ordinary Time — Mt 20:1–16: the parable of the workers in the vineyard and the generous wage.",
    sourceTitle: "Thợ làm vườn nho: lòng quảng đại của Thiên Chúa",
    sourceSummary:
      "Suy niệm thứ Tư tuần XX Thường niên — Mt 20,1–16: dụ ngôn thợ làm vườn nho và đồng lương quảng đại.",
    sourceContent: `*"Nước Trời giống như chuyện gia chủ kia, vừa tảng sáng đã ra mướn thợ vào làm việc trong vườn nho của mình."* (Mt 20,1)

## Công bằng hay quảng đại?

Người thợ giờ thứ nhất cằn nhằn vì người đến sau lãnh cùng một đồng. Theo lẽ công bằng sòng phẳng, họ đúng. Nhưng ông chủ không bất công — ông quảng đại. Và Thiên Chúa thì vượt trên sự sòng phẳng của con người.

## Không ai là quá muộn

Có người đến với Chúa từ thuở nhỏ, có người chỉ kịp thưa một lời trên giường bệnh. Dụ ngôn khẳng định: không ai bị loại trừ vì đến muộn. Lòng thương xót không tính giờ.

## Đừng so đo

Cám dỗ lớn của người đạo đức lâu năm là so đo với người "mới đến". Tin Mừng mời gọi vui với niềm vui của ông chủ: vì người anh em tưởng đã mất, nay lại tìm thấy.

> Lạy Chúa, xin dạy con vui với lòng quảng đại của Chúa, thay vì so đo tính toán phần của mình. Amen.`,
    content: `*"The kingdom of heaven is like a landowner who went out at dawn to hire laborers for his vineyard."* (Mt 20:1)

## Justice or Generosity?

The laborers hired at the first hour grumbled because those who came last received the same denarius. By the logic of strict justice, they were right. Yet the master was not unjust — he was generous. And God transcends human calculations of fairness.

## No One Arrives Too Late

Some come to the Lord from childhood, while others only manage to utter a final word on their sickbed. The parable affirms: no one is excluded for arriving late. Divine mercy keeps no office hours.

## Do Not Compare or Envy

The great temptation for longtime believers is to measure themselves against newcomers. The Gospel invites us to rejoice in the master's joy: for the brother once thought lost has now been found.

Lord, teach me to rejoice in Your generosity rather than calculating my own share. Amen.`,
  },
  "thu-ba-tuan-20": {
    title: "A Camel Passing Through the Eye of a Needle",
    summary:
      "Reflection for Tuesday of the 20th Week in Ordinary Time — Mt 19:23–30: riches and the path into the Kingdom of Heaven.",
    sourceTitle: "Con lạc đà chui qua lỗ kim",
    sourceSummary:
      "Suy niệm thứ Ba tuần XX Thường niên — Mt 19,23–30: của cải và con đường vào Nước Trời.",
    sourceContent: `*"Con lạc đà chui qua lỗ kim còn dễ hơn người giàu vào Nước Thiên Chúa."* (Mt 19,24)

## Giàu có không phải là tội

Chúa Giêsu không kết án của cải. Người cảnh giác về sự bám víu: khi tài sản trở thành ông chủ, trái tim không còn chỗ cho Thiên Chúa và tha nhân.

## Giàu theo cách nào?

Người buôn bán giữa phố cổ Hội An hiểu rõ giá trị của đồng tiền làm ra bằng mồ hôi. Câu hỏi Tin Mừng đặt ra không phải là "có bao nhiêu", mà là "trái tim đặt ở đâu".

## Với Thiên Chúa, mọi sự đều có thể

Các môn đệ sửng sốt: "Vậy ai có thể được cứu?" Câu trả lời của Chúa là niềm hy vọng: ơn cứu độ là quà tặng của Thiên Chúa, không phải thành tích của con người. Điều cần là đôi tay biết mở ra — mở với Chúa và mở với người nghèo.

> Lạy Chúa, xin cho con biết dùng của cải đời này mà mua lấy kho tàng trên trời. Amen.`,
    content: `*"It is easier for a camel to go through the eye of a needle than for a rich person to enter the kingdom of God."* (Mt 19:24)

## Wealth Is Not a Sin

Jesus does not condemn material goods. He warns against attachment: when possessions become the master, there is no longer room in the heart for God and neighbor.

## In What Way Are We Rich?

Merchants in Hoi An's ancient town know well the value of money earned through honest toil. The Gospel's question is not "how much do you have," but "where is your heart set."

## With God, All Things Are Possible

The disciples were astonished: "Who then can be saved?" The Lord's reply brings hope: salvation is a gift of God, not human achievement. What is needed is hands willing to open — open to God and open to the poor.

> Lord, grant that I may use the goods of this world to lay up treasure in heaven. Amen.`,
  },
  "le-me-hon-xac-len-troi": {
    title: "The Assumption of Our Lady — Pilgrim's Hope",
    summary:
      "Reflection for the Solemnity of the Assumption of the Blessed Virgin Mary — parish patronal feast: Magnificat, the song of the lowly exalted.",
    sourceTitle: "Mẹ lên trời — niềm hy vọng của lữ khách",
    sourceSummary:
      "Suy niệm lễ Đức Mẹ Hồn Xác Lên Trời — bổn mạng giáo xứ: Magnificat, bài ca của người nghèo được nâng lên.",
    sourceContent: `*"Đấng Toàn Năng đã làm cho tôi biết bao điều cao cả."* (Lc 1,49)

## Bài ca Magnificat

Trong ngày lễ bổn mạng giáo xứ, chúng ta cùng hát lại bài ca Magnificat với Mẹ. Bài ca ấy không phải của người quyền thế, mà của nữ tỳ khiêm hạ — người được Thiên Chúa đoái nhìn.

## Mẹ lên trời — niềm hy vọng của chúng ta

Mẹ được rước về trời cả hồn lẫn xác là lời hứa rằng: thân phận con người, với tất cả lao nhọc của đời thường — buôn bán, chài lưới, nuôi con, bệnh tật — không đi vào hư vô, nhưng được Thiên Chúa đón nhận và biến đổi.

## Với giáo xứ Hội An

Qua bao thế kỷ, cộng đoàn Hội An đã chạy đến cùng Mẹ trong mọi biến cố: chiến tranh, bão lụt, dịch bệnh và những ngày bình yên. Nhà thờ giữa lòng phố cổ này là chứng tích của lòng trung thành ấy.

> Lạy Mẹ Hồn Xác Lên Trời, bổn mạng giáo xứ chúng con, xin cầu cho chúng con biết noi gương Mẹ: khiêm nhường phục vụ và vững lòng cậy trông. Amen.`,
    content: `*"The Almighty has done great things for me."* (Lk 1:49)

## The Canticle of the Magnificat

On our parish patronal feast day, we join Mary in singing the Magnificat once more. It is not the anthem of the powerful, but the prayer of a humble handmaid looked upon by God.

## Mary Assumed into Heaven — Our Hope

Mary's assumption into heaven, body and soul, is the promise that human existence, with all the labor of everyday life — trade, fishing, raising children, sickness — does not vanish into nothingness, but is received and transfigured by God.

## For Hoi An Parish

Across centuries, the community of Hoi An has sought refuge with Our Lady in every trial: war, floods, epidemics, and days of peace. This church in the heart of the ancient town stands as a testament to that enduring fidelity.

> Our Lady of the Assumption, patroness of our parish, pray for us that we may imitate your example: serving humbly and trusting steadfastly. Amen.`,
  },
  "chua-nhat-20-thuong-nien": {
    title: "I Have Come to Bring Fire to the Earth",
    summary:
      "Reflection for the 20th Sunday in Ordinary Time, Year C — Lk 12:49–53: the purifying fire that Jesus brings to the world.",
    sourceTitle: "Lửa Thầy đã đến ném vào mặt đất",
    sourceSummary:
      "Suy niệm Chúa nhật XX Thường niên năm C — Lc 12,49–53: ngọn lửa thanh luyện mà Chúa Giêsu mang đến cho thế gian.",
    sourceContent: `*"Thầy đã đến ném lửa vào mặt đất, và Thầy những ước mong phải chi lửa ấy đã bùng lên!"* (Lc 12,49)

## Ngọn lửa nào?

Thoạt nghe, lời Chúa Giêsu có vẻ dữ dội. Nhưng ngọn lửa Người nói đến không phải là lửa hủy diệt, mà là lửa thanh luyện — lửa của tình yêu, của Thánh Thần, thiêu đốt những gì là giả dối, ích kỷ và nguội lạnh trong lòng người.

## Bình an hay chia rẽ?

Chúa không cổ võ chia rẽ. Nhưng khi sự thật được loan báo, người ta buộc phải chọn lựa — và chính chọn lựa ấy đôi khi tạo nên rạn nứt ngay trong gia đình. Lịch sử các thánh tử đạo Việt Nam, trong đó có những vị đã bước qua Hội An, là minh chứng: chọn Chúa đôi khi phải trả giá bằng chính mối dây thân thuộc.

## Cho chúng ta hôm nay

Giữa phố cổ yên bình, giữa nhịp sống du lịch rộn ràng, người Kitô hữu Hội An được mời gọi giữ cho ngọn lửa đức tin luôn cháy sáng: trong gia đình, nơi buôn bán, giữa những cuộc gặp gỡ du khách gần xa.

> Lạy Chúa, xin đốt lên trong lòng chúng con ngọn lửa yêu mến, để chúng con trở nên ánh sáng giữa đời thường. Amen.`,
    content: `*"I have come to bring fire to the earth, and how I wish it were already kindled!"* (Lk 12:49)

## Which Fire?

At first glance, Jesus' words may seem severe. But the fire He speaks of is not destructive fire; it is purifying fire — the fire of love, of the Holy Spirit, consuming falsehood, selfishness, and lukewarmness within the human heart.

## Peace or Division?

The Lord does not promote division. Yet when truth is proclaimed, one is compelled to make a choice — and that choice can sometimes cause fractures even within families. The history of the Vietnamese Martyrs, including those who passed through Hoi An, bears witness: choosing Christ can sometimes cost kinship ties.

## For Us Today

Amidst the tranquil ancient town and the vibrant rhythm of tourism, Christians in Hoi An are called to keep the flame of faith burning brightly: at home, in trade, and in encounters with visitors from near and far.

> Lord, kindle in our hearts the fire of love, so that we may become light in everyday life. Amen.`,
  },
  "trai-he-gioi-tre-2026": {
    title: "Parish Youth Summer Camp: 'Light, Salt, and Leaven'",
    summary:
      "Over 80 young people joined a two-day, one-night summer camp themed 'You are the light of the world'.",
    sourceTitle: "Giới trẻ giáo xứ sinh hoạt hè: Trại hè 'Ánh Sáng Muối Men'",
    sourceSummary:
      "Hơn 80 bạn trẻ tham dự trại hè hai ngày một đêm với chủ đề 'Các con là ánh sáng thế gian'.",
    sourceContent: `Trong hai ngày cuối tháng Bảy, Ban Mục vụ giới trẻ đã tổ chức trại hè thường niên với chủ đề **"Các con là ánh sáng thế gian"** (Mt 5,14), thu hút hơn 80 bạn trẻ trong và ngoài giáo xứ.

## Chương trình

- Lửa trại và sinh hoạt đội nhóm
- Học hỏi Lời Chúa theo phương pháp Lectio Divina
- Trò chơi lớn khám phá phố cổ — kết hợp tìm hiểu di sản đức tin Hội An
- Thánh lễ tạ ơn bế mạc

## Dư âm

Nhiều bạn trẻ lần đầu tham dự đã bày tỏ mong muốn tiếp tục sinh hoạt định kỳ. Ban tổ chức sẽ duy trì buổi gặp mặt mỗi tháng hai lần và lên kế hoạch cho chuyến thiện nguyện mùa Vọng sắp tới.

Các bạn trẻ muốn tham gia xin liên hệ văn phòng giáo xứ hoặc theo dõi thông báo hằng tuần.`,
    content: `During the last two days of July, the Youth Pastoral Committee organized the annual summer camp with the theme **"You are the light of the world"** (Mt 5:14), gathering more than 80 youths from within and outside the parish.

## Program Highlights

- Campfire and team-building activities
- Scripture reflection using the Lectio Divina method
- Wide-game exploring the ancient town — discovering Hoi An's heritage of faith
- Concluding Thanksgiving Mass

## Echoes & Next Steps

Many first-time participants expressed enthusiasm for ongoing gatherings. The organizing committee will host bi-weekly meetings and plan for an upcoming Advent charity outreach.

Youth wishing to participate may contact the parish office or follow weekly parish announcements.`,
  },
  "rao-hon-phoi-08-2026": {
    title: "Marriage Banns: Peter & Maria",
    summary:
      "First publication of marriage banns for a couple preparing to celebrate the Sacrament of Matrimony.",
    sourceTitle: "Rao hôn phối: Anh Phêrô & Chị Maria",
    sourceSummary:
      "Rao hôn phối lần 1 cho đôi bạn chuẩn bị cử hành Bí tích Hôn phối trong thời gian tới.",
    sourceContent: `Văn phòng giáo xứ rao hôn phối lần thứ nhất cho đôi bạn:

- **Anh Phêrô Nguyễn Văn T.**, giáo xứ Hội An
- **Chị Maria Lê Thị Thu T.**, giáo xứ bạn

Đôi bạn dự định cử hành Bí tích Hôn phối tại nhà thờ giáo xứ trong thời gian tới.

Ai biết đôi bạn có ngăn trở gì theo Giáo luật, xin vui lòng báo cho cha xứ hoặc văn phòng giáo xứ. Rao ba lần trong ba Chúa nhật liên tiếp.`,
    content: `The parish office announces the first publication of marriage banns for:

- **Mr. Peter Nguyen Van T.**, Hoi An parish
- **Ms. Maria Le Thi Thu T.**, neighboring parish

The couple intends to celebrate the Sacrament of Matrimony at the parish church in the near future.

Anyone knowing of any impediment under Canon Law is obliged to inform the parish priest or parish office. Published three times on three consecutive Sundays.`,
  },
  "le-them-suc-2026": {
    title: "Sacrament of Confirmation Conferred on 45 Children",
    summary:
      "The Diocesan Bishop celebrated the Mass of Confirmation for 45 children in a solemn and prayerful atmosphere.",
    sourceTitle: "Thánh lễ ban Bí tích Thêm sức cho 45 em thiếu nhi",
    sourceSummary:
      "Đức Giám mục Giáo phận đã cử hành Thánh lễ ban Bí tích Thêm sức cho 45 em thiếu nhi giáo xứ trong bầu khí trang nghiêm, sốt sắng.",
    sourceContent: `Sáng Chúa nhật vừa qua, cộng đoàn giáo xứ hân hoan đón Đức Giám mục Giáo phận về thăm mục vụ và cử hành Thánh lễ ban Bí tích Thêm sức cho 45 em thiếu nhi đã hoàn thành chương trình giáo lý.

## Chuẩn bị tâm hồn

Trước ngày trọng đại, các em đã tham dự hai buổi tĩnh tâm và lãnh nhận Bí tích Hòa giải. Cha phó xứ cùng các giáo lý viên đã đồng hành với các em suốt hai năm học giáo lý.

## Thánh lễ trọng thể

Trong bài giảng, Đức cha nhắn nhủ các em hãy để Chúa Thánh Thần hướng dẫn đời mình, trở nên chứng nhân nhỏ bé nhưng can đảm của Tin Mừng giữa gia đình và trường học.

Cuối lễ, đại diện phụ huynh dâng lời tri ân Đức cha, quý cha và các giáo lý viên. Mỗi em nhận một phần quà kỷ niệm từ giáo xứ.

> Xin cộng đoàn tiếp tục cầu nguyện cho các em vừa lãnh nhận Bí tích Thêm sức luôn vững bước trong đức tin.`,
    content: `Last Sunday morning, the parish community joyfully welcomed the Diocesan Bishop on a pastoral visit to celebrate the Mass conferring the Sacrament of Confirmation on 45 children who completed the catechism curriculum.

## Spiritual Preparation

Leading up to the solemn day, the confirmands attended two retreats and received the Sacrament of Reconciliation. The parochial vicar and catechists accompanied the children throughout their two years of study.

## Solemn Mass

In his homily, the Bishop encouraged the children to let the Holy Spirit guide their lives and to become humble yet courageous witnesses of the Gospel at home and in school.

At the end of Mass, a parents' representative offered words of gratitude to the Bishop, priests, and catechists. Each child received a commemorative gift from the parish.

> We invite the entire community to continue praying for the newly confirmed, that they may walk steadfastly in faith.`,
  },
  "khai-giang-giao-ly-2026": {
    title: "Opening of the 2026–2027 Catechetical Year",
    summary:
      "Registration for children's catechism open August 18–31 at parish office. Opening Mass Sunday, September 6, 2026.",
    sourceTitle: "Khai giảng năm học giáo lý 2026–2027",
    sourceSummary:
      "Đăng ký giáo lý thiếu nhi từ 18.08 đến 31.08 tại văn phòng giáo xứ. Khai giảng Chúa nhật 06.09.2026.",
    sourceContent: `Ban Giáo lý giáo xứ thông báo đến quý phụ huynh và các em thiếu nhi về việc ghi danh năm học giáo lý mới.

## Thời gian đăng ký

- Từ **18.08 đến 31.08.2026**, tại văn phòng giáo xứ trong giờ hành chính.
- Phụ huynh mang theo giấy chứng nhận Rửa tội của các em (nếu có).

## Khai giảng

Thánh lễ khai giảng sẽ được cử hành vào **Chúa nhật 06.09.2026, lúc 07:00**, dành riêng cho thiếu nhi. Sau Thánh lễ, các em sẽ nhận lớp và gặp giáo lý viên phụ trách.

## Các khối lớp

Năm nay giáo xứ mở các khối từ Khai tâm đến Vào đời, chia theo độ tuổi và trình độ giáo lý. Các em mới đến lần đầu sẽ được xếp lớp sau buổi gặp gỡ với Ban Giáo lý.

> "Cứ để trẻ em đến với Thầy, đừng ngăn cấm chúng." (Mt 19,14)

Mọi thắc mắc xin liên hệ văn phòng giáo xứ.`,
    content: `The Parish Catechetical Committee announces enrollment details for parents and children for the upcoming catechetical year.

## Registration Period

- From **August 18 to August 31, 2026**, at the parish office during office hours.
- Parents should present the child's Baptism certificate (if applicable).

## Opening Mass

The opening Mass will be celebrated on **Sunday, September 6, 2026, at 07:00**, dedicated to the children. Following Mass, students will assemble in classrooms and meet their catechists.

## Class Levels

Classes this year range from Initiation to Entering the World (Vào đời), organized by age and catechetical level. Newcomers will be placed following an orientation interview with the Catechetical Committee.

> "Let the children come to me, and do not prevent them." (Mt 19:14)

For questions, please contact the parish office.`,
  },
  "caritas-tham-vieng-mua-vu-lan": {
    title: "Parish Caritas Visits and Gift Giving for Vu Lan Season",
    summary:
      "Caritas visited and distributed 60 care packages to vulnerable families and the sick within the parish.",
    sourceTitle: "Caritas giáo xứ thăm viếng và tặng quà mùa Vu Lan – Báo hiếu",
    sourceSummary:
      "Ban Caritas đã thăm và trao 60 phần quà cho các gia đình khó khăn và bệnh nhân trong địa bàn giáo xứ.",
    sourceContent: `Trong tinh thần bác ái Kitô giáo và hòa cùng truyền thống hiếu nghĩa của dân tộc, Ban Caritas giáo xứ đã tổ chức đợt thăm viếng các gia đình khó khăn, người già neo đơn và bệnh nhân.

## 60 phần quà nghĩa tình

Mỗi phần quà gồm gạo, nhu yếu phẩm và một phong bì nhỏ, do cộng đoàn đóng góp qua hòm công đức bác ái. Các tình nguyện viên chia thành bốn nhóm, đi đến từng nhà trong hai ngày cuối tuần.

## Những cuộc gặp gỡ

Điều quý giá nhất không phải là phần quà vật chất, mà là những cuộc gặp gỡ: lắng nghe, cầu nguyện và nâng đỡ nhau trong đức tin. Nhiều cụ ông cụ bà xúc động vì lâu ngày mới có người đến thăm.

> "Mỗi lần các ngươi làm như thế cho một trong những anh em bé nhỏ nhất của Ta đây, là các ngươi đã làm cho chính Ta vậy." (Mt 25,40)

Ban Caritas chân thành cảm ơn quý ân nhân và mời gọi cộng đoàn tiếp tục cộng tác trong các chương trình sắp tới.`,
    content: `In the spirit of Christian charity and honoring traditional filial piety, Parish Caritas visited vulnerable families, elderly persons living alone, and the homebound sick.

## 60 Care Packages of Compassion

Each package included rice, essential food items, and a modest gift envelope funded by community donations through the parish charity box. Volunteers formed four teams visiting households across the weekend.

## Meaningful Encounters

The greatest treasure was not material goods, but personal encounter: listening, praying, and uplifting one another in faith. Many elderly parishioners were deeply touched by the visit after long periods of solitude.

"Whatever you did for one of the least of these brothers and sisters of mine, you did for me." (Mt 25:40)

Parish Caritas warmly thanks all benefactors and invites the community to support upcoming initiatives.`,
  },
  "cao-pho-ba-co-maria": {
    title: "Obituary: Mrs. Maria Nguyen Thi Huong",
    summary:
      "Mrs. Maria Nguyen Thi Huong of the Rosary Zone fell asleep in the Lord on August 12, 2026, aged 89.",
    sourceTitle: "Cáo phó: Bà cố Maria Nguyễn Thị Hưởng",
    sourceSummary:
      "Bà cố Maria Nguyễn Thị Hưởng, giáo khu Mân Côi, đã an nghỉ trong Chúa ngày 12.08.2026, hưởng thọ 89 tuổi.",
    sourceContent: `**Trong niềm tin vào Chúa Kitô Phục Sinh, gia đình và giáo xứ kính báo:**

Bà cố **Maria Nguyễn Thị Hưởng**, sinh năm 1937, thuộc giáo khu Mân Côi, đã được Chúa gọi về lúc 03:15 ngày 12.08.2026, hưởng thọ 89 tuổi.

## Chương trình tang lễ

- **Nghi thức tẩm liệm:** 15:00 ngày 12.08.2026
- **Thánh lễ an táng:** 05:00 ngày 15.08.2026, tại nhà thờ giáo xứ
- **An táng:** tại nghĩa trang giáo xứ

Xin cộng đoàn hiệp ý cầu nguyện cho linh hồn Maria sớm được hưởng nhan thánh Chúa.

> "Chính Thầy là sự sống lại và là sự sống." (Ga 11,25)`,
    content: `**In the hope of the Risen Christ, the family and parish announce:**

Mrs. **Maria Nguyen Thi Huong**, born in 1937, of the Rosary Zone, was called home by the Lord at 03:15 on August 12, 2026, at the age of 89.

## Funeral Schedule

- **Encoffining Rite:** 15:00 on August 12, 2026
- **Funeral Mass:** 05:00 on August 15, 2026, at the parish church
- **Interment:** at the parish cemetery

We invite the community to unite in prayer that the soul of Maria may soon behold the face of God.

> "I am the resurrection and the life." (Jn 11:25)`,
  },
};

function normalize(str: string): string {
  return str.replace(/\r\n/g, "\n").trim();
}

export function localizeArticle(locale: Locale, article: BaiViet): BaiViet {
  if (locale !== "en" || article.locale === "en") {
    return article;
  }

  const translation = Object.hasOwn(articlesEn, article.slug) ? articlesEn[article.slug] : undefined;
  if (!translation) {
    return article;
  }

  const titleMatch = normalize(article.title) === normalize(translation.sourceTitle);
  const summaryMatch = normalize(article.summary) === normalize(translation.sourceSummary);
  const contentMatch = normalize(article.content) === normalize(translation.sourceContent);

  if (!titleMatch || !summaryMatch || !contentMatch) {
    return article;
  }

  return {
    ...article,
    locale: "en",
    title: translation.title,
    summary: translation.summary,
    content: translation.content,
    tags: (article.tags ?? []).map((tag) => translate("en", tag)),
    author: Object.hasOwn(AUTHOR_MAP, article.author) ? AUTHOR_MAP[article.author] : translate("en", article.author),
  };
}

export default articlesEn;
