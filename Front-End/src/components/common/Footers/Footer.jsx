import React from 'react';
import './Footer.css';

// Import icon từ react-icons
import { FaFacebookF, FaInstagram, FaGithub, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      {/* <div className="footer-brand">
        <img src="/logo2.png" alt="Logo hệ thống" className="footer-logo" />
        <span className="footer-title">Hệ thống Hỗ trợ Hiến máu</span>
      </div> */}
      <div className="footer-grid">
        <div className="footer-section about">
          <h3>Về Chúng Tôi</h3>
          <p>
            Hệ thống Hỗ trợ Hiến máu là một nền tảng kết nối người hiến máu, tình nguyện viên và bệnh viện để giúp cứu sống nhiều hơn mỗi ngày.
          </p>
          <div className="divider"></div>
          <div className="footer-section legal">
            <h3>Thông Tin Pháp Lý</h3>
            <p><a href="/terms">Điều khoản sử dụng</a></p>
            <p><a href="/privacy">Chính sách bảo mật</a></p>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Liên kết Nhanh</h3>
          <ul>
            <li><a href="/donate">Hiến Máu</a></li>
            <li><a href="/campaigns">Chiến Dịch</a></li>
            <li><a href="/volunteer">Tình Nguyện</a></li>
            <li><a href="/contact">Liên Hệ</a></li>
          </ul>
          <div className="divider"></div>
          <div className="footer-section hours">
            <h3>Giờ Làm Việc</h3>
            <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
            <p>Thứ 7: 8:00 - 12:00</p>
            <p>Chủ Nhật: Nghỉ</p>
          </div>
        </div>

        <div className="footer-section contact">
          <h3>Liên Hệ</h3>
          <p>Email: support@blooddonation.org</p>
          <p>Đường dây nóng: 1900 123 456</p>
          <p>Địa chỉ: 123 Đường Y Dược, Quận 1, Thành phố Hồ Chí Minh</p>

          <div className="footer-section map">
          <h3>Bản Đồ</h3>
          <div className="map-embed">
            <iframe
              title="Địa chỉ trung tâm hiến máu"
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d823.4980198602092!2d107.06519300955979!3d10.945324247479395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1za2h1IDYg4bqlcCBiw6B1IGPDoSwgeMOjIFRydW5nIEjDsmEsIGh1eeG7h24gVHLhuqNuZyBCb20sIMSQ4buTbmcgTmFpLCBWaeG7h3QgTmFtIA!5e0!3m2!1svi!2sus!4v1749570728416!5m2!1svi!2sus"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            {/*           
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d823.4980198602092!2d107.06519300955979!3d10.945324247479395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1za2h1IDYg4bqlcCBiw6B1IGPDoSwgeMOjIFRydW5nIEjDsmEsIGh1eeG7h24gVHLhuqNuZyBCb20sIMSQ4buTbmcgTmFpLCBWaeG7h3QgTmFtIA!5e0!3m2!1svi!2sus!4v1749570728416!5m2!1svi!2sus" 
              width="600" 
              height="450" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
          >
          </iframe> */}
          </div>
        </div>

          {/* Thêm phần biểu tượng mạng xã hội */}
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://github.com/AnhKhoaa157" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Hệ thống Hỗ trợ Hiến Máu. Hãy chia sẻ để cứu sống.</p>
      </div>
    </footer>
  );
}
