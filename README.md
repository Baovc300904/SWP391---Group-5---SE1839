# 🩸 Blood Donation Management System

Hệ thống quản lý hoạt động hiến máu được xây dựng nhằm hỗ trợ tổ chức, quản lý và theo dõi các chiến dịch hiến máu tại các đơn vị y tế, trường học hoặc tổ chức từ thiện.

---

## 💡 Mục tiêu

- Tạo, cập nhật, tìm kiếm các hoạt động hiến máu
- Quản lý người tham gia, đăng ký hiến máu
- Thống kê số lượng người hiến, nhóm máu, số lượng máu thu được
- Hỗ trợ truyền thông và theo dõi hiệu quả chiến dịch

---

## 🔧 Công nghệ sử dụng

- **Java 21**
- **Spring Boot**
- **Spring Data JPA**
- **MySQL / PostgreSQL**
- **Jakarta Validation**
- **Lombok**
- **Postman (OpenAPI)**

---

## 📦 Các chức năng chính

### 🩸 Hoạt động hiến máu (`/api/blood-donation-activities`)
- Tạo mới hoạt động hiến máu
- Cập nhật thông tin hoạt động
- Lấy danh sách hoạt động có phân trang, tìm kiếm
- Lấy chi tiết hoạt động theo ID

### 👤 Người tham gia (sẽ mở rộng sau)
- Đăng ký tham gia hoạt động
- Lưu lịch sử hiến máu
- Nhận giấy chứng nhận điện tử

---

## 🚀 Cách chạy project

### Yêu cầu:
- JDK 21+
- Maven
- MySQL (hoặc H2 nếu dùng cấu hình mặc định)

### Cách chạy:
```bash
git clone https://github.com/your-username/...
cd blood-donation-system
mvn spring-boot:run
