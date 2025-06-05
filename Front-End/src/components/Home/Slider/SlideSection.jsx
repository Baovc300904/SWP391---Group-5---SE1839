import React from 'react'
import Slider from 'react-slick';
import { Card, CardContent } from "@/components/common/card";
import slideshow1 from '../../../assets/images/slideshows/slideshow1.png'; // Adjust the path as necessary
import './SlideSection.css'; // Import your CSS file for styling
export default function SlideSection({ sliderSettings }) {
    const sliderImages = [
      { src: slideshow1, alt: "banner1" },
      { src: "https://...", alt: "banner2" },
    ];
  
    return (
        <>
        <div className="slider-wrapper">
          <Slider {...sliderSettings}>
            {sliderImages.map((img, index) => (
              <img key={index} src={img.src} alt={img.alt} className="slider-image" />
            ))}
          </Slider>
        </div>
    
        <div className="info-boxes">
          <Card className="card mission">
            <CardContent>
              <h3 className="card-title">Sứ mệnh của chúng tôi</h3>
              <p>
                Hỗ trợ kết nối người hiến máu với các trung tâm y tế, lan tỏa
                giá trị nhân văn.
              </p>
            </CardContent>
          </Card>
    
          <Card className="card benefit">
            <CardContent>
              <h3 className="card-title">Lợi ích khi tham gia</h3>
              <p>
                Nhận thông báo nhanh, theo dõi lịch hiến máu, và góp phần cứu
                sống nhiều người.
              </p>
            </CardContent>
          </Card>
    
          <Card className="card activities">
            <CardContent>
              <h3 className="card-title">Các hoạt động nổi bật</h3>
              <p>
                Ngày hội hiến máu, chia sẻ câu chuyện, và các chương trình
                khuyến khích cộng đồng.
              </p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }
