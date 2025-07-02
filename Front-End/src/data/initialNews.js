import NewImage1 from "../assets/images/initialNews/news1.webp";
import NewImage2 from "../assets/images/initialNews/news2.webp";


const initialNews = [
    {
        id: 0,
        title: "Công nghệ hỗ trợ cải thiện quy trình hiến máu năm 2025",
        author: "Nguyễn Văn A",
        date: "2025-06-01",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.OC_ry1Fmlf40ghl3IyzndAHaEa?w=301&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
        caption: "Công nghệ mới giúp tự động hóa đăng ký và theo dõi sức khỏe người hiến máu.",
        description: "Sự phát triển công nghệ giúp nâng cao hiệu quả và an toàn trong quy trình hiến máu.",
        content: `
          <p>Các ứng dụng và phần mềm hiện đại hỗ trợ đăng ký hiến máu nhanh chóng, giảm thời gian chờ đợi.</p>
          <h2>Tự động hóa quy trình</h2>
          <p>Hệ thống quản lý người hiến máu giúp theo dõi sức khỏe và lịch sử hiến máu chính xác.</p>
          <blockquote>"Công nghệ giúp nâng cao trải nghiệm và an toàn cho người hiến máu."</blockquote>
          <h2>Tác động lâu dài</h2>
          <p>Ứng dụng công nghệ giúp huy động nguồn máu ổn định và chuẩn bị cho các tình huống cấp cứu.</p>
        `
    },
    {
        id: 1,
        title: "Hiến máu tình nguyện: Nghĩa cử cao đẹp giữa đời thường",
        author: "Lê Thị B",
        date: "2025-06-02",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.OC_ry1Fmlf40ghl3IyzndAHaEa?w=301&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
        caption: "Người dân xếp hàng chờ đến lượt hiến máu tại Hà Nội.",
        description: "Hiến máu không chỉ cứu người mà còn thể hiện tinh thần nhân văn và chia sẻ cộng đồng.",
        content: `
          <p>Hiến máu tình nguyện là hành động thiết thực góp phần cứu sống hàng ngàn bệnh nhân.</p>
          <h2>Tình người trong từng giọt máu</h2>
          <p>Người hiến máu không chỉ cho đi máu mà còn truyền đi hy vọng sống cho nhiều người.</p>
          <blockquote>"Mỗi giọt máu cho đi - Một cuộc đời ở lại."</blockquote>
          <h2>Phát động phong trào</h2>
          <p>Nhiều tổ chức, trường học và doanh nghiệp thường xuyên tổ chức ngày hội hiến máu.</p>
        `
    },
    {
        id: 2,
        title: "Sinh viên đại học tổ chức ngày hội hiến máu đầy cảm hứng",
        author: "Trần Văn C",
        date: "2025-06-03",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.OQG62KaKhbWHu-iyxsnNlwHaE8?w=600&h=400&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Hàng trăm sinh viên tham gia hiến máu tại trường đại học Bách Khoa.",
        description: "Ngày hội hiến máu do sinh viên tổ chức đã thu hút đông đảo người tham gia.",
        content: `
          <p>Chương trình 'Giọt máu hồng' diễn ra sôi nổi với hơn 500 đơn vị máu được tiếp nhận.</p>
          <h2>Sự kiện ý nghĩa</h2>
          <p>Không khí rộn ràng với các tiết mục văn nghệ và hoạt động hỗ trợ hiến máu.</p>
          <blockquote>"Chúng tôi muốn truyền cảm hứng và tinh thần nhân đạo cho cộng đồng."</blockquote>
          <h2>Lan tỏa mạnh mẽ</h2>
          <p>Sự kiện được lan tỏa trên mạng xã hội, thu hút nhiều người trẻ tham gia.</p>
        `
    },
    {
        id: 3,
        title: "Hiến máu định kỳ: Cách bảo vệ sức khỏe và giúp đời",
        author: "Phạm Thị D",
        date: "2025-06-04",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.aCjzfsH4Yb3gKUW_HoE9xAHaE7?w=600&h=400&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Người dân được kiểm tra sức khỏe trước khi hiến máu.",
        description: "Hiến máu định kỳ không chỉ giúp người khác mà còn mang lại lợi ích cho chính bản thân.",
        content: `
          <p>Theo các chuyên gia, hiến máu đều đặn có thể kích thích tủy xương sản sinh máu mới.</p>
          <h2>Lợi ích sức khỏe</h2>
          <p>Hiến máu giúp giảm sắt dư thừa, cải thiện tuần hoàn máu và kiểm tra sức khỏe miễn phí.</p>
          <blockquote>"Hiến máu là liều thuốc bổ cho cơ thể nếu được thực hiện đúng cách."</blockquote>
          <h2>Khuyến khích cộng đồng</h2>
          <p>Các tổ chức y tế khuyến khích mọi người từ 18 đến 60 tuổi hiến máu định kỳ mỗi 3-4 tháng.</p>
        `
    },
    {
        id: 4,
        title: "Chiến dịch hè đỏ 2025 chính thức khởi động toàn quốc",
        author: "Đỗ Mạnh E",
        date: "2025-06-05",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.NRNh5sSnnS-yaobmyI7JZgHaE8?w=600&h=400&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Lễ phát động chiến dịch Hè Đỏ 2025 tại TP. Hồ Chí Minh.",
        description: "Chiến dịch Hè Đỏ 2025 nhằm thu hút hàng chục ngàn đơn vị máu từ cộng đồng.",
        content: `
          <p>Chiến dịch diễn ra từ tháng 6 đến tháng 8 năm 2025, với sự tham gia của hàng ngàn đoàn viên thanh niên.</p>
          <h2>Mục tiêu thiết thực</h2>
          <p>Chiến dịch đặt mục tiêu tiếp nhận ít nhất 50.000 đơn vị máu trong mùa hè.</p>
          <blockquote>"Thanh niên là lực lượng xung kích trong các hoạt động nhân đạo."</blockquote>
          <h2>Đa dạng hình thức tổ chức</h2>
          <p>Sự kiện được tổ chức ở cả khu vực đô thị và nông thôn, linh hoạt về thời gian và địa điểm.</p>
        `
    },

    {
        id: 5,
        title: "Hiến máu nhân đạo - Nghĩa cử cao đẹp giữa đời thường",
        author: "Lê Trung Hiếu",
        date: "2025-06-06",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.70Nzx0oUyoKvl4Rg-Piv_wHaE8?w=242&h=161&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Hiến máu là hành động giúp cứu sống nhiều người bệnh.",
        description: "Phong trào hiến máu nhân đạo ngày càng lan rộng, trở thành nét đẹp văn hóa trong xã hội.",
        content: `
          <p>Mỗi giọt máu cho đi là một hy vọng được trao gửi đến những người cần máu.</p>
          <h2>Ý nghĩa nhân văn</h2>
          <p>Hiến máu thể hiện tinh thần đoàn kết, yêu thương con người trong cộng đồng.</p>
          <blockquote>"Hiến máu là một nghĩa cử cao đẹp, góp phần cứu sống hàng triệu người."</blockquote>
          <h2>Đóng góp của thế hệ trẻ</h2>
          <p>Ngày càng nhiều bạn trẻ tham gia các hoạt động hiến máu tình nguyện tại các trường học và khu dân cư.</p>
        `
    },
    {
        id: 6,
        title: "Ứng dụng trí tuệ nhân tạo trong quản lý hiến máu",
        author: "Phạm Minh Khôi",
        date: "2025-06-07",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.pL_nJ-W0A_7zF1Fu8-F4RAHaEK?w=273&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "AI hỗ trợ theo dõi, phân tích lượng máu và tình trạng người hiến.",
        description: "Công nghệ AI đang được ứng dụng để tối ưu hóa công tác quản lý máu và người hiến.",
        content: `
          <p>AI giúp phân tích dữ liệu người hiến máu, đảm bảo nguồn máu luôn sẵn sàng khi cần thiết.</p>
          <h2>Phân tích dữ liệu hiệu quả</h2>
          <p>Hệ thống AI dự báo nhu cầu và tình trạng kho máu giúp bệnh viện chuẩn bị tốt hơn.</p>
          <h2>Tăng cường độ chính xác</h2>
          <p>Giảm thiểu rủi ro trong xét nghiệm và lưu trữ máu nhờ AI và công nghệ tự động.</p>
        `
    },
    {
        id: 7,
        title: "Hiến máu trong cộng đồng sinh viên",
        author: "Trần Thu Hà",
        date: "2025-06-08",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.3UZT3pLU4yrJkpApAtx7-QHaE7?w=287&h=191&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Sinh viên tích cực tham gia các chương trình hiến máu.",
        description: "Cộng đồng sinh viên đóng vai trò nòng cốt trong các chiến dịch hiến máu tình nguyện.",
        content: `
          <p>Sinh viên là lực lượng trẻ, khỏe mạnh và đầy nhiệt huyết trong việc hiến máu cứu người.</p>
          <h2>Lan tỏa tinh thần thiện nguyện</h2>
          <p>Các câu lạc bộ và tổ chức sinh viên thường xuyên tổ chức các đợt hiến máu.</p>
          <blockquote>"Sinh viên không chỉ học tập mà còn góp phần vì cộng đồng thông qua hiến máu."</blockquote>
          <h2>Giá trị lâu dài</h2>
          <p>Việc tham gia từ khi còn là sinh viên giúp hình thành thói quen sống tích cực và nhân văn.</p>
        `
    },
    {
        id: 8,
        title: "Chương trình hiến máu lưu động đến vùng sâu vùng xa",
        author: "Vũ Ngọc Lan",
        date: "2025-06-09",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.lsRRr8UO5Pq_VZDXMiH2TAHaE8?w=289&h=193&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Đưa chương trình hiến máu đến với người dân vùng khó khăn.",
        description: "Các tổ chức thiện nguyện mang cơ hội hiến máu đến những nơi còn thiếu thốn dịch vụ y tế.",
        content: `
          <p>Chương trình hiến máu lưu động giúp người dân vùng sâu có cơ hội được cứu chữa khi cần máu.</p>
          <h2>Tiếp cận cộng đồng</h2>
          <p>Đội ngũ y tế di chuyển đến các địa phương xa để tổ chức lấy máu.</p>
          <h2>Kết nối yêu thương</h2>
          <p>Người dân địa phương rất nhiệt tình tham gia và coi đây là hành động cao đẹp.</p>
        `
    },
    {
        id: 9,
        title: "Tầm quan trọng của nhóm máu hiếm trong cấp cứu",
        author: "Đinh Bảo Hân",
        date: "2025-06-10",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.tUSrSmHdHR-sMgt0qWWOfgHaEK?w=311&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Nhóm máu hiếm thường khan hiếm trong các tình huống khẩn cấp.",
        description: "Người có nhóm máu hiếm được khuyến khích duy trì hiến máu định kỳ để cứu người.",
        content: `
          <p>Nhóm máu hiếm như AB- chỉ chiếm tỉ lệ rất nhỏ và cực kỳ cần trong cấp cứu.</p>
          <h2>Giá trị sinh mạng</h2>
          <p>Mỗi đơn vị máu hiếm có thể quyết định sự sống còn cho người bệnh.</p>
          <h2>Phát động hiến máu hiếm</h2>
          <p>Các tổ chức khuyến khích người có nhóm máu hiếm đăng ký và được theo dõi đặc biệt.</p>
        `
    },
    {
        id: 10,
        title: "Ngày hội Hiến máu toàn quốc 2025 diễn ra thành công",
        author: "Ngô Thanh Bình",
        date: "2025-06-11",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.hkmYPPsrbzKX5QKhtA3RIgHaEK?w=314&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Sự kiện thu hút hàng ngàn người tham gia hiến máu trên cả nước.",
        description: "Ngày hội diễn ra sôi nổi tại nhiều tỉnh thành với kết quả tích cực về lượng máu thu được.",
        content: `
          <p>Ngày hội hiến máu toàn quốc là sự kiện thường niên có ý nghĩa nhân văn lớn.</p>
          <h2>Quy mô rộng khắp</h2>
          <p>Hơn 50 tỉnh thành đã đồng loạt tổ chức các điểm hiến máu lưu động.</p>
          <h2>Kết quả ấn tượng</h2>
          <p>Lượng máu tiếp nhận vượt 150% chỉ tiêu đặt ra, giúp tăng cường dự trữ quốc gia.</p>
        `
    },
    {
        id: 11,
        title: "Vai trò của truyền thông trong nâng cao nhận thức hiến máu",
        author: "Hồ Mai Phương",
        date: "2025-06-12",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.Q4Nh9v9lPO6Ju8b5EYaHawHaEK?w=311&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Thông điệp về hiến máu được lan tỏa mạnh mẽ qua mạng xã hội.",
        description: "Truyền thông đóng vai trò quan trọng trong việc kêu gọi và duy trì phong trào hiến máu.",
        content: `
          <p>Thông tin về nhu cầu máu và những câu chuyện cảm động tạo động lực cho cộng đồng tham gia hiến máu.</p>
          <h2>Tác động nhanh chóng</h2>
          <p>Mạng xã hội giúp lan tỏa các chiến dịch kêu gọi hiến máu trong thời gian ngắn.</p>
          <h2>Truyền cảm hứng</h2>
          <p>Các video, hình ảnh, chia sẻ thực tế đã tạo hiệu ứng tích cực đến cộng đồng.</p>
        `
    },
    {
        id: 12,
        title: "Người hiến máu định kỳ: Hành trình 10 năm vì cộng đồng",
        author: "Trịnh Văn Duy",
        date: "2025-06-13",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.mSl_5Kj4zhxD9zWkp0v_cwHaE8?w=266&h=177&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Người đàn ông với 40 lần hiến máu và truyền cảm hứng cho thế hệ trẻ.",
        description: "Người hiến máu định kỳ không chỉ là anh hùng thầm lặng mà còn là tấm gương sáng.",
        content: `
          <p>Ông Duy bắt đầu hiến máu từ năm 2015 và duy trì đều đặn suốt 10 năm qua.</p>
          <h2>Đóng góp bền vững</h2>
          <p>Ông luôn sẵn sàng có mặt trong các tình huống khẩn cấp và hiến máu nhóm hiếm.</p>
          <h2>Gương sáng cộng đồng</h2>
          <p>Câu chuyện của ông được chia sẻ rộng rãi để khuyến khích thế hệ trẻ tham gia.</p>
        `
    },
    {
        id: 13,
        title: "Các câu lạc bộ hiến máu tại trường học hoạt động ra sao?",
        author: "Lưu Thị Hằng",
        date: "2025-06-14",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.hkmYPPsrbzKX5QKhtA3RIgHaEK?w=314&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Câu lạc bộ hiến máu giúp duy trì phong trào trong học sinh, sinh viên.",
        description: "Câu lạc bộ tình nguyện đóng vai trò quan trọng trong tuyên truyền và tổ chức hiến máu.",
        content: `
          <p>Các trường học hiện có nhiều mô hình câu lạc bộ hiến máu hoạt động hiệu quả.</p>
          <h2>Gắn kết học sinh, sinh viên</h2>
          <p>Thông qua các hoạt động ngoại khóa, CLB giúp học sinh hiểu rõ hơn về tầm quan trọng của hiến máu.</p>
          <h2>Hỗ trợ tổ chức sự kiện</h2>
          <p>CLB cũng là lực lượng hỗ trợ đắc lực trong các sự kiện lớn tại trường và địa phương.</p>
        `
    },
    {
        id: 14,
        title: "Hiến máu – hành động nhỏ, ý nghĩa lớn",
        author: "Nguyễn Quốc Huy",
        date: "2025-06-15",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.XyfqOV3LkTtrRGlZKbD5PwHaE8?w=284&h=189&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Mỗi giọt máu cho đi là một sự sống được cứu.",
        description: "Hiến máu là một hành động đơn giản nhưng mang lại ý nghĩa lớn lao.",
        content: `
          <p>Chỉ mất khoảng 30 phút nhưng bạn có thể cứu sống được tới 3 người.</p>
          <h2>Lợi ích không ngờ</h2>
          <p>Hiến máu không chỉ giúp người mà còn tốt cho sức khỏe bản thân.</p>
          <h2>Kêu gọi cộng đồng</h2>
          <p>Ngày càng có nhiều chiến dịch truyền cảm hứng để kêu gọi mọi người tham gia hiến máu định kỳ.</p>
        `
    },
    {
        id: 15,
        title: "Khó khăn trong lưu trữ và bảo quản máu",
        author: "Đặng Kim Ngân",
        date: "2025-06-16",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.K_gKsmICN6LqaMiOj-u-PAHaEK?w=324&h=182&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Công tác bảo quản máu đòi hỏi kỹ thuật và thiết bị chuyên dụng.",
        description: "Việc lưu trữ máu đòi hỏi tiêu chuẩn nghiêm ngặt để đảm bảo chất lượng.",
        content: `
          <p>Máu hiến cần được lưu trữ trong điều kiện nhiệt độ và thời gian nhất định để duy trì chất lượng.</p>
          <h2>Quy trình nghiêm ngặt</h2>
          <p>Trung tâm hiến máu cần tuân thủ quy trình bảo quản chặt chẽ theo quy định.</p>
          <h2>Thiếu trang thiết bị</h2>
          <p>Nhiều địa phương gặp khó khăn do thiếu tủ lạnh chuyên dụng và hệ thống xét nghiệm đạt chuẩn.</p>
        `
    },
    {
        id: 16,
        title: "Hiến máu trong bối cảnh đại dịch",
        author: "Trần Văn Mạnh",
        date: "2025-06-17",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.8r8_h2nTo3grE3yZJRTkEgHaEK?w=312&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Đại dịch làm giảm lượng máu dự trữ nghiêm trọng.",
        description: "Dịch bệnh làm gián đoạn hoạt động hiến máu, ảnh hưởng nghiêm trọng đến ngành y tế.",
        content: `
          <p>Trong thời kỳ dịch, các bệnh viện rơi vào tình trạng thiếu máu nghiêm trọng do người dân ngại tiếp xúc.</p>
          <h2>Đảm bảo an toàn</h2>
          <p>Các trung tâm hiến máu đã áp dụng nhiều biện pháp phòng dịch như chia ca, giữ khoảng cách, sát khuẩn kỹ.</p>
          <h2>Chiến dịch vượt khó</h2>
          <p>Các chiến dịch "hiến máu an toàn" đã phần nào duy trì được lượng máu cần thiết cho cấp cứu và điều trị.</p>
        `
    },
    {
        id: 17,
        title: "Học sinh cấp 3 tham gia hiến máu lần đầu",
        author: "Phạm Bảo Trân",
        date: "2025-06-18",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.cFjxHz6zFZYtWzXCMWz3_QHaEo?w=276&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Các em học sinh trên 17 tuổi được khuyến khích tham gia hiến máu.",
        description: "Nhiều trường THPT đã phối hợp tổ chức các ngày hội hiến máu.",
        content: `
          <p>Học sinh được tuyên truyền kỹ trước khi tham gia và đều cảm thấy tự hào với hành động của mình.</p>
          <h2>Giáo dục sớm ý thức cộng đồng</h2>
          <p>Hoạt động này giúp các em hiểu về giá trị của lòng nhân ái và trách nhiệm công dân.</p>
          <h2>Phản hồi tích cực</h2>
          <p>Phụ huynh và thầy cô đều ủng hộ mạnh mẽ chương trình này vì ý nghĩa nhân văn sâu sắc.</p>
        `
    },
    {
        id: 18,
        title: "Trung tâm hiến máu nhân đạo ứng dụng phần mềm quản lý thông minh",
        author: "Nguyễn Bích Ngọc",
        date: "2025-06-19",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.lsRRr8UO5Pq_VZDXMiH2TAHaE8?w=289&h=193&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Phần mềm giúp theo dõi lịch sử hiến máu và thông tin người hiến hiệu quả.",
        description: "Các trung tâm hiến máu bắt đầu áp dụng CNTT để cải thiện dịch vụ.",
        content: `
          <p>Hệ thống phần mềm mới giúp lưu trữ hồ sơ người hiến, quản lý kho máu và gửi nhắc lịch hẹn tự động.</p>
          <h2>Hiệu quả rõ rệt</h2>
          <p>Giảm tình trạng trùng lặp, sai sót và tăng tính minh bạch trong quy trình hiến máu.</p>
          <h2>Tích hợp thông minh</h2>
          <p>Hệ thống còn kết nối với app di động giúp người hiến dễ theo dõi và đặt lịch hẹn.</p>
        `
    },
    {
        id: 19,
        title: "Câu chuyện người mẹ hiến máu để cứu con người khác",
        author: "Hoàng Thị Yến",
        date: "2025-06-20",
        category: "Hiến máu",
        image: "https://th.bing.com/th/id/OIP.Q4Nh9v9lPO6Ju8b5EYaHawHaEK?w=311&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7",
        caption: "Một hành động nhân ái lan tỏa niềm tin và hy vọng.",
        description: "Người mẹ đã tự nguyện hiến máu để cứu một bé trai không quen biết.",
        content: `
          <p>Chị Yến, 42 tuổi, nghe tin có một bé cần truyền máu khẩn cấp và lập tức đến bệnh viện để hiến máu.</p>
          <h2>Hành động nhân văn</h2>
          <p>Không phải là người thân, chị vẫn quyết định cho đi máu để giúp đỡ cậu bé qua cơn nguy kịch.</p>
          <h2>Lan tỏa yêu thương</h2>
          <p>Câu chuyện của chị đã được lan truyền trên mạng xã hội và khiến nhiều người cảm động.</p>
        `
    }
];

export default initialNews;
