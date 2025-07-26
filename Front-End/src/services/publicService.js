// Public service for guest access - provides realistic data without API calls
export const getPublicDashboardAnalysis = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentHour = currentDate.getHours();
      
      // Simulate realistic blood bank statistics based on Vietnam data
      const baseStats = {
        totalDonors: 24380, // Based on Vietnam blood donation statistics
        totalBloodUnits: 67450,
        totalCampaigns: 243,
        totalHospitals: 89,
        successfulDonations: 23150,
        emergencyRequests: 127,
        bloodTypesAvailable: {
          'O+': 3450,
          'A+': 2890,
          'B+': 2340,
          'AB+': 890,
          'O-': 780,
          'A-': 650,
          'B-': 520,
          'AB-': 290
        }
      };
      
      // Add realistic variations
      if (currentHour >= 8 && currentHour <= 18) {
        baseStats.totalDonors += Math.floor(Math.random() * 25);
        baseStats.totalBloodUnits += Math.floor(Math.random() * 50);
      }
      
      // Seasonal variations (more donations in certain months)
      if (currentMonth >= 10 || currentMonth <= 2) { // Winter months
        baseStats.totalBloodUnits += Math.floor(Math.random() * 200);
      }
      
      resolve({
        data: baseStats,
        status: 'success'
      });
    }, 600);
  });
};

export const getPublicCampaigns = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const campaigns = [
        {
          id: 1,
          title: "Chiến dịch Hiến máu Tết Nguyên Đán 2024",
          description: "Cùng chung tay hiến máu cứu người trong dịp Tết Nguyên Đán, mang yêu thương đến với những bệnh nhân đang cần được giúp đỡ.",
          location: "Bệnh viện Chợ Rẫy, TP.HCM",
          startDate: "2024-02-10",
          endDate: "2024-02-15",
          targetBloodUnits: 1000,
          currentBloodUnits: 750,
          status: "active",
          image: "/images/campaigns/tet-campaign.jpg"
        },
        {
          id: 2,
          title: "Hiến máu Nhân đạo - Tháng Thanh niên",
          description: "Kêu gọi thanh niên, sinh viên tham gia hiến máu tình nguyện, lan tỏa tinh thần nhân đạo trong cộng đồng trẻ.",
          location: "Đại học Y Dược TP.HCM",
          startDate: "2024-03-15",
          endDate: "2024-03-20",
          targetBloodUnits: 800,
          currentBloodUnits: 420,
          status: "active",
          image: "/images/campaigns/youth-campaign.jpg"
        },
        {
          id: 3,
          title: "Chương trình Hiến máu Cộng đồng",
          description: "Chương trình hiến máu định kỳ tại các khu dân cư, dễ dàng tiếp cận và tham gia cho mọi người dân.",
          location: "Trung tâm Y tế Quận 1",
          startDate: "2024-02-20",
          endDate: "2024-02-25",
          targetBloodUnits: 600,
          currentBloodUnits: 380,
          status: "upcoming",
          image: "/images/campaigns/community-campaign.jpg"
        },
        {
          id: 4,
          title: "Hiến máu Khẩn cấp - Hỗ trợ Bệnh viện",
          description: "Hỗ trợ khẩn cấp cho các bệnh viện đang thiếu hụt máu, đặc biệt các nhóm máu hiếm.",
          location: "Bệnh viện Bình Dân, TP.HCM", 
          startDate: "2024-02-12",
          endDate: "2024-02-18",
          targetBloodUnits: 500,
          currentBloodUnits: 450,
          status: "urgent",
          image: "/images/campaigns/emergency-campaign.jpg"
        },
        {
          id: 5,
          title: "Ngày Hiến máu Thế giới 2024",
          description: "Tham gia cùng phong trào hiến máu toàn cầu, góp phần vào mục tiêu nhân đạo chung của thế giới.",
          location: "Trung tâm Huyết học TP.HCM",
          startDate: "2024-06-14",
          endDate: "2024-06-16",
          targetBloodUnits: 1200,
          currentBloodUnits: 0,
          status: "upcoming",
          image: "/images/campaigns/world-blood-day.jpg"
        }
      ];
      
      resolve({
        data: campaigns,
        status: 'success',
        total: campaigns.length
      });
    }, 500);
  });
};

export const getPublicBloodTypes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const bloodTypes = [
        {
          type: 'O+',
          name: 'O Dương',
          availability: 'Cao',
          units: 3450,
          urgency: 'normal',
          description: 'Nhóm máu phổ biến nhất, có thể cho hầu hết các nhóm máu khác'
        },
        {
          type: 'A+',
          name: 'A Dương', 
          availability: 'Cao',
          units: 2890,
          urgency: 'normal',
          description: 'Nhóm máu phổ biến, cần thiết cho nhiều ca phẫu thuật'
        },
        {
          type: 'B+',
          name: 'B Dương',
          availability: 'Trung bình',
          units: 2340,
          urgency: 'medium',
          description: 'Nhóm máu cần thiết, đang có nhu cầu cao tại các bệnh viện'
        },
        {
          type: 'AB+',
          name: 'AB Dương',
          availability: 'Thấp',
          units: 890,
          urgency: 'high',
          description: 'Nhóm máu hiếm, có thể nhận từ tất cả các nhóm máu khác'
        },
        {
          type: 'O-',
          name: 'O Âm',
          availability: 'Rất thấp',
          units: 780,
          urgency: 'critical',
          description: 'Nhóm máu hiếm nhất, có thể cho tất cả nhóm máu - cần gấp!'
        },
        {
          type: 'A-',
          name: 'A Âm',
          availability: 'Thấp',
          units: 650,
          urgency: 'high',
          description: 'Nhóm máu hiếm, rất cần thiết cho các ca cấp cứu'
        },
        {
          type: 'B-',
          name: 'B Âm',
          availability: 'Rất thấp',
          units: 520,
          urgency: 'critical',
          description: 'Nhóm máu rất hiếm, đang trong tình trạng thiếu hụt nghiêm trọng'
        },
        {
          type: 'AB-',
          name: 'AB Âm',
          availability: 'Cực kỳ hiếm',
          units: 290,
          urgency: 'critical',
          description: 'Nhóm máu hiếm nhất, chỉ có thể nhận từ nhóm máu âm'
        }
      ];
      
      resolve({
        data: bloodTypes,
        status: 'success'
      });
    }, 400);
  });
};

export const getPublicTestimonials = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const testimonials = [
        {
          id: 1,
          name: "Nguyễn Thị Hạnh",
          age: 28,
          bloodType: "O+",
          location: "TP. Hồ Chí Minh",
          donationCount: 15,
          testimonial: "Tôi đã hiến máu được 5 năm và cảm thấy rất hạnh phúc khi biết mình có thể giúp đỡ những người cần. Đây thực sự là việc làm ý nghĩa nhất mà tôi có thể đóng góp cho cộng đồng.",
          avatar: "/images/avatars/avatar1.jpg",
          date: "2024-01-15"
        },
        {
          id: 2,
          name: "Trần Minh Khoa", 
          age: 35,
          bloodType: "A+",
          location: "Hà Nội",
          donationCount: 22,
          testimonial: "Việc hiến máu không chỉ giúp ích cho người khác mà còn giúp tôi kiểm tra sức khỏe định kỳ. Tôi cảm thấy tự hào khi nghĩ rằng máu của mình có thể cứu sống một ai đó.",
          avatar: "/images/avatars/avatar2.jpg", 
          date: "2024-01-20"
        },
        {
          id: 3,
          name: "Lê Thị Mai",
          age: 24,
          bloodType: "B+",
          location: "Đà Nẵng",
          donationCount: 8,
          testimonial: "Lần đầu hiến máu tôi rất lo lắng, nhưng các y tá rất tận tâm và chu đáo. Giờ đây tôi hiến máu đều đặn mỗi 3 tháng và khuyến khích bạn bè cùng tham gia.",
          avatar: "/images/avatars/avatar3.jpg",
          date: "2024-01-25"
        },
        {
          id: 4,
          name: "Phạm Văn Đức",
          age: 42,
          bloodType: "AB+",
          location: "Cần Thơ",
          donationCount: 30,
          testimonial: "Là người có nhóm máu AB+, tôi biết máu của mình rất quý giá. Đã 10 năm tôi đều đặn hiến máu và sẽ tiếp tục cho đến khi sức khỏe còn cho phép.",
          avatar: "/images/avatars/avatar4.jpg",
          date: "2024-02-01"
        }
      ];
      
      resolve({
        data: testimonials,
        status: 'success'
      });
    }, 450);
  });
};

export const getPublicHospitals = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hospitals = [
        {
          id: 1,
          name: "Bệnh viện Chợ Rẫy",
          address: "201B Nguyễn Chí Thanh, Quận 5, TP.HCM",
          phone: "(028) 3855 4269",
          emergencyPhone: "(028) 3855 4270",
          bloodBankCapacity: 5000,
          currentStock: 4200,
          urgentNeeds: ["O-", "AB-"],
          coordinates: { lat: 10.7539, lng: 106.6621 }
        },
        {
          id: 2,
          name: "Bệnh viện Bình Dân",
          address: "371 Điện Biên Phủ, Quận 3, TP.HCM", 
          phone: "(028) 3855 4137",
          emergencyPhone: "(028) 3855 4138",
          bloodBankCapacity: 3500,
          currentStock: 2800,
          urgentNeeds: ["B-", "O-"],
          coordinates: { lat: 10.7823, lng: 106.6926 }
        },
        {
          id: 3,
          name: "Bệnh viện Đại học Y Dược",
          address: "215 Hồng Bàng, Quận 5, TP.HCM",
          phone: "(028) 3855 2504",
          emergencyPhone: "(028) 3855 2505", 
          bloodBankCapacity: 4000,
          currentStock: 3600,
          urgentNeeds: ["AB+", "A-"],
          coordinates: { lat: 10.7569, lng: 106.6567 }
        }
      ];
      
      resolve({
        data: hospitals,
        status: 'success'
      });
    }, 550);
  });
};
