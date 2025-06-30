# 🔧 Hướng dẫn khắc phục lỗi CORS - Step by Step

## 🚨 Vấn đề hiện tại
```
Access to XMLHttpRequest at 'http://localhost:8080/api/blood-donation-activities' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

## 📋 Checklist trước khi bắt đầu
- [ ] Backend Spring Boot project đã được import vào IDE
- [ ] Database đã được cấu hình và có dữ liệu
- [ ] Frontend đang chạy trên port 5173

## 🛠️ Bước 1: Kiểm tra Backend Server

### 1.1 Kiểm tra backend có chạy không
```bash
# Mở browser, truy cập:
http://localhost:8080

# Nếu không load được → Backend chưa chạy
```

### 1.2 Start backend server
```bash
# Trong thư mục backend
cd "Back-End (Final)/hienmauapi-main"

# Chạy bằng Maven
./mvnw spring-boot:run

# Hoặc nếu dùng Windows
mvnw.cmd spring-boot:run
```

### 1.3 Kiểm tra port 8080 có bị chiếm không
```bash
# Windows
netstat -ano | findstr :8080

# Nếu có process đang chạy, kill nó:
taskkill /PID <PID> /F
```

## 🛠️ Bước 2: Cấu hình CORS trong Backend

### 2.1 Tạo CorsConfig class
Tạo file `src/main/java/org/fpt/blooddonate/configs/CorsConfig.java`:

```java
package org.fpt.blooddonate.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### 2.2 Hoặc thêm @CrossOrigin vào Controller
Cập nhật `BloodDonationActivityController.java`:

```java
@RestController
@RequestMapping("/api/blood-donation-activities")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class BloodDonationActivityController {
    // Your existing methods...
}
```

### 2.3 Hoặc cấu hình trong application.properties
Thêm vào `src/main/resources/application.properties`:

```properties
# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
spring.web.cors.max-age=3600
```

## 🛠️ Bước 3: Kiểm tra API Endpoints

### 3.1 Test API bằng Postman
```bash
# Test GET request
GET http://localhost:8080/api/blood-donation-activities?page=1&status=sapdienra

# Test OPTIONS request (CORS preflight)
OPTIONS http://localhost:8080/api/blood-donation-activities
Headers:
  Origin: http://localhost:5173
  Access-Control-Request-Method: GET
  Access-Control-Request-Headers: Content-Type
```

### 3.2 Test bằng curl
```bash
# Test GET
curl -X GET http://localhost:8080/api/blood-donation-activities

# Test OPTIONS
curl -X OPTIONS http://localhost:8080/api/blood-donation-activities \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type"
```

## 🛠️ Bước 4: Kiểm tra Database

### 4.1 Kiểm tra bảng HoatDongHienMau có dữ liệu không
```sql
-- Kiểm tra bảng có tồn tại không
SHOW TABLES LIKE 'HoatDongHienMau';

-- Kiểm tra có dữ liệu không
SELECT * FROM HoatDongHienMau LIMIT 5;

-- Thêm dữ liệu test nếu cần
INSERT INTO HoatDongHienMau (ten, ngayBatDau, ngayKetThuc, diaDiem, moTa, soLuongNguoiToiDa, trangThaiHoatDong, ngayTao, ngayCapNhat, nguoiTaoId) 
VALUES ('Test Campaign', '2024-01-20', '2024-01-20', 'Test Location', 'Test Description', 100, 'sapdienra', NOW(), NOW(), 1);
```

## 🛠️ Bước 5: Debug Frontend

### 5.1 Kiểm tra Network tab
1. Mở Developer Tools (F12)
2. Chuyển sang tab Network
3. Refresh trang
4. Tìm request bị lỗi và kiểm tra:
   - Request URL
   - Request Method
   - Response Headers

### 5.2 Kiểm tra Console
- Xem có lỗi JavaScript nào khác không
- Kiểm tra error messages từ axios

## 🛠️ Bước 6: Restart Services

### 6.1 Restart Backend
```bash
# Stop backend (Ctrl+C)
# Start lại
./mvnw spring-boot:run
```

### 6.2 Restart Frontend
```bash
# Stop frontend (Ctrl+C)
# Start lại
npm run dev
```

## 🚨 Common Issues & Solutions

### Issue 1: Backend không start được
**Symptoms:** Error khi chạy `./mvnw spring-boot:run`
**Solutions:**
```bash
# Kiểm tra Java version
java -version

# Clean và rebuild
./mvnw clean install

# Chạy với debug
./mvnw spring-boot:run -X
```

### Issue 2: Database connection error
**Symptoms:** Error về database connection
**Solutions:**
```properties
# Kiểm tra application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Issue 3: Port 8080 đã được sử dụng
**Symptoms:** "Port 8080 is already in use"
**Solutions:**
```bash
# Tìm process đang sử dụng port 8080
netstat -ano | findstr :8080

# Kill process
taskkill /PID <PID> /F

# Hoặc đổi port trong application.properties
server.port=8081
```

### Issue 4: CORS vẫn lỗi sau khi config
**Symptoms:** Vẫn có CORS error
**Solutions:**
1. Đảm bảo đã restart backend sau khi thêm CORS config
2. Kiểm tra origins có đúng không
3. Thử tắt credentials tạm thời:
```java
.allowCredentials(false) // Thay vì true
```

## 🔧 Quick Fix Commands

```bash
# 1. Kill tất cả process trên port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# 2. Start backend
cd "Back-End (Final)/hienmauapi-main"
./mvnw spring-boot:run

# 3. Start frontend (terminal khác)
cd Front-End
npm run dev

# 4. Test API
curl http://localhost:8080/api/blood-donation-activities
```

## 📞 Support Checklist

Nếu vẫn gặp vấn đề, hãy kiểm tra:

1. **Backend logs:**
   - Có error gì trong console không?
   - Database connection có thành công không?

2. **Frontend logs:**
   - Browser console có error gì không?
   - Network tab có request nào bị fail không?

3. **Database:**
   - Database có chạy không?
   - Bảng có dữ liệu không?

4. **Network:**
   - Firewall có block port 8080 không?
   - Antivirus có block connection không?

## 🎯 Expected Result

Sau khi fix thành công:
- Frontend sẽ load được dữ liệu từ backend
- Không còn CORS error trong console
- API calls sẽ thành công
- Dashboard sẽ hiển thị danh sách hoạt động hiến máu 