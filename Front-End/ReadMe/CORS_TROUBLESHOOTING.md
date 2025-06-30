# Hướng dẫn khắc phục lỗi CORS

## Lỗi hiện tại
```
Access to XMLHttpRequest at 'http://localhost:8080/api/blood-donation-activities' 
from origin 'http://localhost:5173' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Nguyên nhân
Lỗi CORS xảy ra khi:
1. Backend server không chạy
2. Backend chưa cấu hình CORS đúng cách
3. Frontend và Backend chạy trên các port khác nhau

## Cách khắc phục

### 1. Kiểm tra Backend Server
Đảm bảo backend server đang chạy trên port 8080:
```bash
# Kiểm tra xem có process nào đang chạy trên port 8080 không
netstat -ano | findstr :8080
```

### 2. Cấu hình CORS trong Backend (Spring Boot)

#### Cách 1: Sử dụng @CrossOrigin annotation
```java
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class BloodDonationActivityController {
    // Your controller methods
}
```

#### Cách 2: Cấu hình global CORS
Tạo file `CorsConfig.java`:
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

#### Cách 3: Cấu hình trong application.properties
```properties
# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

### 3. Kiểm tra API Endpoints
Đảm bảo các API endpoints tồn tại:
- `GET /api/blood-donation-activities`
- `GET /api/blogs`
- `GET /api/blog-categories`

### 4. Test API bằng Postman hoặc curl
```bash
# Test API endpoint
curl -X GET http://localhost:8080/api/blood-donation-activities

# Test với CORS headers
curl -X OPTIONS http://localhost:8080/api/blood-donation-activities \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type"
```

### 5. Kiểm tra Network Tab
1. Mở Developer Tools (F12)
2. Chuyển sang tab Network
3. Refresh trang
4. Kiểm tra các request bị lỗi

### 6. Debug Steps
1. **Kiểm tra backend có chạy không:**
   - Truy cập `http://localhost:8080` trong browser
   - Nếu không load được → Backend chưa chạy

2. **Kiểm tra API endpoint:**
   - Truy cập `http://localhost:8080/api/blood-donation-activities`
   - Nếu 404 → Endpoint không tồn tại

3. **Kiểm tra CORS headers:**
   - Trong Network tab, xem response headers
   - Tìm `Access-Control-Allow-Origin`

## Cấu hình Frontend

### 1. Kiểm tra base URL
Trong file `src/variables/baseUrl.js`:
```javascript
export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
```

### 2. Kiểm tra environment variables
Tạo file `.env.local`:
```env
VITE_BASE_URL=http://localhost:8080
```

## Lưu ý quan trọng
- **Development:** Cho phép tất cả origins (`*`) để dễ debug
- **Production:** Chỉ cho phép specific origins
- **Credentials:** Nếu sử dụng cookies/sessions, set `allowCredentials: true`

## Common Issues
1. **Backend chưa chạy:** Start backend server trước
2. **Port conflict:** Kiểm tra port 8080 có bị chiếm không
3. **CORS config sai:** Đảm bảo origins đúng với frontend URL
4. **API endpoint không tồn tại:** Kiểm tra controller mapping

## Support
Nếu vẫn gặp vấn đề, hãy:
1. Kiểm tra console logs của backend
2. Kiểm tra browser console
3. Test API bằng Postman
4. Restart cả frontend và backend 