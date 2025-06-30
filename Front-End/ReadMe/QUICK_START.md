# 🚀 Quick Start - Kết nối Backend API

## ⚡ Các bước nhanh để fix CORS

### 1. Start Backend
```bash
cd "Back-End (Final)/hienmauapi-main"
./mvnw spring-boot:run
```

### 2. Thêm CORS Config vào Backend
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
                .allowCredentials(true);
    }
}
```

### 3. Restart Backend
```bash
# Stop (Ctrl+C) và start lại
./mvnw spring-boot:run
```

### 4. Test API
```bash
# Test bằng curl
curl http://localhost:8080/api/blood-donation-activities

# Hoặc mở browser
http://localhost:8080/api/blood-donation-activities
```

### 5. Start Frontend
```bash
cd Front-End
npm run dev
```

## 🔧 Nếu vẫn lỗi CORS

### Kiểm tra backend có chạy không:
```bash
# Windows
netstat -ano | findstr :8080

# Nếu có process, kill nó:
taskkill /PID <PID> /F
```

### Kiểm tra database:
```sql
SELECT * FROM HoatDongHienMau LIMIT 5;
```

### Test bằng script:
```bash
node test-backend-connection.js
```

## 📞 Nếu vẫn gặp vấn đề

1. **Backend không start:** Kiểm tra Java version và database connection
2. **CORS vẫn lỗi:** Đảm bảo đã restart backend sau khi thêm CORS config
3. **API 404:** Kiểm tra controller mapping và endpoint URL
4. **Database error:** Kiểm tra connection string và credentials

Xem file `CORS_FIX_GUIDE.md` để có hướng dẫn chi tiết hơn. 