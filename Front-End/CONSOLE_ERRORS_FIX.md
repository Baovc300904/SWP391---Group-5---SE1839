# 🔧 Khắc phục tất cả lỗi Console

## 📋 Tóm tắt các lỗi từ Console

### 1. CSS Deprecation Warning
```
[Deprecation] -ms-high-contrast is in the process of being deprecated
```

### 2. CORS Error
```
Access to XMLHttpRequest at 'http://localhost:8080/api/blood-donation-activities' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

### 3. Network Error
```
GET http://localhost:8080/api/blood-donation-activities net::ERR_FAILED
```

## ✅ Đã khắc phục

### 1. CSS Deprecation Warning ✅
- **File:** `src/style/legacy-fixes.css`
- **Thay đổi:** Xóa `@media (-ms-high-contrast: active)` deprecated
- **Giữ lại:** `@media (forced-colors: active)` modern
- **Kết quả:** Không còn warning về -ms-high-contrast

### 2. CORS Error 🔧
- **Vấn đề:** Backend không có CORS headers
- **Giải pháp:** Thêm CORS configuration vào backend
- **Files tạo:** 
  - `CORS_ERROR_FIX.md` - Hướng dẫn chi tiết
  - `fix-cors-issues.ps1` - Script tự động
  - `test-backend-connection.mjs` - Test script

### 3. Network Error 🔧
- **Vấn đề:** Backend server không khả dụng
- **Giải pháp:** Start backend server và cấu hình CORS

## 🚀 Cách khắc phục nhanh

### Bước 1: Chạy script tự động
```powershell
.\fix-cors-issues.ps1
```

### Bước 2: Thêm CORS vào Backend
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

### Bước 3: Start Backend
```bash
cd "Back-End (Final)/hienmauapi-main"
./mvnw spring-boot:run
```

### Bước 4: Test API
```bash
# Test bằng script
node test-backend-connection.mjs

# Hoặc bằng curl
curl http://localhost:8080/api/blood-donation-activities
```

## 📁 Files đã tạo/cập nhật

### Frontend Files
- ✅ `src/style/legacy-fixes.css` - Xóa CSS deprecated
- ✅ `src/services/api/campaignService.js` - API service
- ✅ `src/pages/ForAdmin/CampaignManager.jsx` - Error handling tốt hơn

### Documentation Files
- ✅ `CORS_ERROR_FIX.md` - Hướng dẫn CORS chi tiết
- ✅ `CONSOLE_ERRORS_FIX.md` - Tóm tắt này
- ✅ `fix-cors-issues.ps1` - Script tự động
- ✅ `test-backend-connection.mjs` - Test script

## 🎯 Kết quả mong đợi

Sau khi khắc phục:
- ✅ Không còn CSS deprecation warnings
- ✅ Không còn CORS errors
- ✅ API calls thành công
- ✅ Dashboard hiển thị dữ liệu
- ✅ Console sạch sẽ

## 🔍 Debug Commands

```bash
# Kiểm tra port 8080
netstat -ano | findstr :8080

# Test API
curl http://localhost:8080/api/blood-donation-activities

# Test CORS
curl -X OPTIONS http://localhost:8080/api/blood-donation-activities \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" \
  -v

# Chạy script test
node test-backend-connection.mjs
```

## 📞 Nếu vẫn gặp vấn đề

1. **Backend không start:** Kiểm tra Java version và database
2. **CORS vẫn lỗi:** Đảm bảo đã restart backend sau khi thêm CORS
3. **API 404:** Kiểm tra controller mapping
4. **Database error:** Kiểm tra connection string

Xem file `CORS_ERROR_FIX.md` để có hướng dẫn chi tiết hơn. 