# 🚨 Khắc phục lỗi CORS - Dựa trên Console Log

## 📋 Phân tích lỗi từ Console

Từ console log, tôi thấy lỗi chính:
```
Access to XMLHttpRequest at 'http://localhost:8080/api/blood-donation-activities?page=1&status=sapdienra' 
from origin 'http://localhost:5173' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**Vấn đề:** Backend không có CORS headers, đặc biệt là `Access-Control-Allow-Origin`

## 🔧 Giải pháp từng bước

### Bước 1: Kiểm tra Backend có chạy không

```bash
# Kiểm tra port 8080
netstat -ano | findstr :8080

# Nếu không có process nào → Backend chưa chạy
# Nếu có process → Kill nó và start lại
taskkill /PID <PID> /F
```

### Bước 2: Start Backend

```bash
cd "Back-End (Final)/hienmauapi-main"
./mvnw spring-boot:run
```

### Bước 3: Thêm CORS Configuration

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
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### Bước 4: Hoặc thêm @CrossOrigin vào Controller

Nếu không muốn tạo CorsConfig, thêm annotation vào controller:

```java
@RestController
@RequestMapping("/api/blood-donation-activities")
@CrossOrigin(origins = "http://localhost:5173")
public class BloodDonationActivityController {
    // Your existing methods...
}
```

### Bước 5: Restart Backend

```bash
# Stop backend (Ctrl+C)
# Start lại
./mvnw spring-boot:run
```

### Bước 6: Test API

```bash
# Test bằng curl
curl -X GET http://localhost:8080/api/blood-donation-activities

# Test CORS preflight
curl -X OPTIONS http://localhost:8080/api/blood-donation-activities \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

### Bước 7: Test bằng script

```bash
node test-backend-connection.mjs
```

## 🚨 Nếu vẫn lỗi CORS

### Kiểm tra 1: Backend logs
```bash
# Xem backend logs có error gì không
# Tìm dòng có "CORS" hoặc "Access-Control"
```

### Kiểm tra 2: Database connection
```sql
-- Kiểm tra database có kết nối được không
SELECT 1;

-- Kiểm tra bảng có tồn tại không
SHOW TABLES LIKE 'HoatDongHienMau';
```

### Kiểm tra 3: API endpoint
```bash
# Test endpoint có tồn tại không
curl http://localhost:8080/api/blood-donation-activities
```

## 🔧 Quick Fix Commands

```bash
# 1. Kill tất cả process trên port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# 2. Start backend
cd "Back-End (Final)/hienmauapi-main"
./mvnw spring-boot:run

# 3. Test trong terminal khác
curl http://localhost:8080/api/blood-donation-activities

# 4. Nếu OK, start frontend
cd Front-End
npm run dev
```

## 📞 Debug Checklist

- [ ] Backend server đang chạy trên port 8080
- [ ] CORS configuration đã được thêm
- [ ] Backend đã được restart sau khi thêm CORS
- [ ] Database connection OK
- [ ] API endpoint trả về 200 OK
- [ ] CORS headers có trong response

## 🎯 Expected Result

Sau khi fix thành công:
- Console không còn CORS error
- API calls thành công
- Dashboard hiển thị dữ liệu
- Network tab không có failed requests 