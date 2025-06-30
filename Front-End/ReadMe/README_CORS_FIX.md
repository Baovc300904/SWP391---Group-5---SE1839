# Hướng dẫn khắc phục lỗi CORS cho Blood Donation System

## 🔍 Vấn đề hiện tại
Frontend đang gặp lỗi CORS khi gọi API từ backend:
```
Access to XMLHttpRequest at 'http://localhost:8080/api/blood-donation-activities' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

## 🛠️ Giải pháp

### 1. Kiểm tra Backend Server
Đảm bảo backend Spring Boot đang chạy trên port 8080:
```bash
# Kiểm tra process đang chạy trên port 8080
netstat -ano | findstr :8080

# Hoặc kiểm tra bằng curl
curl http://localhost:8080/api/blood-donation-activities
```

### 2. Cấu hình CORS trong Backend

#### Cách 1: Sử dụng @CrossOrigin annotation
Thêm vào controller:
```java
@RestController
@RequestMapping("/api/blood-donation-activities")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class BloodDonationActivityController {
    // Your controller methods
}
```

#### Cách 2: Tạo CorsConfig class
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

#### Cách 3: Cấu hình trong application.properties
Thêm vào `src/main/resources/application.properties`:
```properties
# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
spring.web.cors.max-age=3600
```

### 3. Kiểm tra API Endpoints
Đảm bảo các API endpoints tồn tại trong backend:
- `GET /api/blood-donation-activities` ✅ (đã có)
- `POST /api/blood-donation-activities` ✅ (đã có)
- `PUT /api/blood-donation-activities/{id}` ✅ (đã có)
- `GET /api/blogs` ❓ (cần kiểm tra)
- `GET /api/blog-categories` ❓ (cần kiểm tra)

### 4. Test API bằng Postman
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

### 5. Debug Steps

#### Bước 1: Kiểm tra backend có chạy không
```bash
# Truy cập http://localhost:8080 trong browser
# Nếu không load được → Backend chưa chạy
```

#### Bước 2: Kiểm tra API endpoint
```bash
# Truy cập http://localhost:8080/api/blood-donation-activities
# Nếu 404 → Endpoint không tồn tại
```

#### Bước 3: Kiểm tra CORS headers
Trong browser Developer Tools → Network tab:
- Tìm request bị lỗi
- Kiểm tra Response Headers có `Access-Control-Allow-Origin` không

### 6. Cấu hình Frontend

#### Kiểm tra base URL
File `src/variables/baseUrl.js`:
```javascript
export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
```

#### Tạo file .env.local
```env
VITE_BASE_URL=http://localhost:8080
```

### 7. Restart Services
```bash
# Restart backend
# Restart frontend
npm run dev
```

## 🚨 Common Issues & Solutions

### Issue 1: Backend không chạy
**Solution:** Start backend server trước
```bash
# Trong thư mục backend
./mvnw spring-boot:run
```

### Issue 2: Port conflict
**Solution:** Kiểm tra port 8080 có bị chiếm không
```bash
# Kill process trên port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Issue 3: CORS config sai
**Solution:** Đảm bảo origins đúng với frontend URL
```java
.allowedOrigins("http://localhost:5173") // Đúng với Vite dev server
```

### Issue 4: API endpoint không tồn tại
**Solution:** Kiểm tra controller mapping
```java
@GetMapping // Đảm bảo có annotation này
public ResponseEntity<Page<BloodDonationActivity>> getAll(...) {
    // ...
}
```

## 📋 Checklist
- [ ] Backend server đang chạy trên port 8080
- [ ] CORS đã được cấu hình trong backend
- [ ] API endpoints tồn tại và hoạt động
- [ ] Frontend base URL đúng
- [ ] Không có port conflict
- [ ] Restart cả frontend và backend

## 🔧 Quick Fix Commands
```bash
# 1. Kill process trên port 8080
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

## 📞 Support
Nếu vẫn gặp vấn đề:
1. Kiểm tra console logs của backend
2. Kiểm tra browser console
3. Test API bằng Postman
4. Đảm bảo cả frontend và backend đều restart 