import React from "react";
import { Heart, Shield, Users, Award, Clock, MapPin } from "lucide-react";
import { Button, Card, Badge } from "../../../../../components/ui";
import "./IntroSection.css";

const IntroSection = () => {
  const features = [
    {
      icon: <Heart size={32} />,
      title: "Hiến máu an toàn",
      description: "Quy trình hiến máu được thực hiện theo tiêu chuẩn quốc tế, đảm bảo an toàn tuyệt đối cho người hiến máu.",
      color: "primary"
    },
    {
      icon: <Shield size={32} />,
      title: "Chất lượng đảm bảo",
      description: "Máu được kiểm tra chất lượng nghiêm ngặt trước khi sử dụng để đảm bảo an toàn cho người nhận.",
      color: "success"
    },
    {
      icon: <Users size={32} />,
      title: "Cộng đồng lớn mạnh",
      description: "Hơn 10,000 người hiến máu tình nguyện tham gia vào cộng đồng hiến máu của chúng tôi.",
      color: "secondary"
    },
    {
      icon: <Award size={32} />,
      title: "Giải thưởng danh giá",
      description: "Được vinh danh là đơn vị hiến máu xuất sắc nhất trong nhiều năm liên tiếp.",
      color: "warning"
    }
  ];

  const stats = [
    {
      icon: <Clock size={24} />,
      value: "24/7",
      label: "Hỗ trợ",
      description: "Dịch vụ hỗ trợ 24/7"
    },
    {
      icon: <MapPin size={24} />,
      value: "50+",
      label: "Điểm hiến máu",
      description: "Trên toàn quốc"
    },
    {
      icon: <Heart size={24} />,
      value: "100%",
      label: "An toàn",
      description: "Đảm bảo an toàn"
    }
  ];

  return (
    <section className="intro-section">
      <div className="container">
        {/* Header */}
        <div className="intro-section__header">
          <Badge variant="primary" size="lg" icon={<Heart size={16} />}>
            Về chúng tôi
          </Badge>
          <h2 className="intro-section__title">
            Cộng đồng hiến máu <span className="text-primary">Việt Nam</span>
          </h2>
          <p className="intro-section__subtitle">
            Chúng tôi cam kết mang đến dịch vụ hiến máu chất lượng cao, an toàn và thuận tiện cho mọi người.
          </p>
        </div>

        {/* Features Grid */}
        <div className="intro-section__features">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              variant="elevated" 
              className="intro-section__feature-card"
            >
              <div className="intro-section__feature-icon">
                {feature.icon}
              </div>
              <h3 className="intro-section__feature-title">{feature.title}</h3>
              <p className="intro-section__feature-description">
                {feature.description}
              </p>
              <Badge variant={feature.color} size="sm">
                {feature.color === 'primary' && 'Ưu tiên'}
                {feature.color === 'success' && 'Đảm bảo'}
                {feature.color === 'secondary' && 'Cộng đồng'}
                {feature.color === 'warning' && 'Danh hiệu'}
              </Badge>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="intro-section__stats">
          {stats.map((stat, index) => (
            <div key={index} className="intro-section__stat-item">
              <div className="intro-section__stat-icon">
                {stat.icon}
              </div>
              <div className="intro-section__stat-content">
                <h3 className="intro-section__stat-value">{stat.value}</h3>
                <p className="intro-section__stat-label">{stat.label}</p>
                <p className="intro-section__stat-description">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="intro-section__cta">
          <Card variant="blood" className="intro-section__cta-card">
            <div className="intro-section__cta-content">
              <h3 className="intro-section__cta-title">
                Sẵn sàng hiến máu cứu người?
              </h3>
              <p className="intro-section__cta-description">
                Mỗi giọt máu của bạn có thể cứu sống một cuộc đời. Hãy tham gia cùng chúng tôi ngay hôm nay!
              </p>
              <div className="intro-section__cta-buttons">
                <Button 
                  variant="primary" 
                  size="lg" 
                  icon={<Heart size={20} />}
                >
                  Đăng ký hiến máu
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
