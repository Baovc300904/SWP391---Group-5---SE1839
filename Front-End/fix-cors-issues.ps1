# PowerShell script để tự động kiểm tra và fix lỗi CORS
# Chạy bằng: .\fix-cors-issues.ps1

Write-Host "🔍 Kiểm tra và khắc phục lỗi CORS..." -ForegroundColor Green

# Bước 1: Kiểm tra port 8080
Write-Host "`n1️⃣ Kiểm tra port 8080..." -ForegroundColor Yellow
$port8080 = netstat -ano | findstr :8080

if ($port8080) {
    Write-Host "⚠️  Port 8080 đang được sử dụng:" -ForegroundColor Yellow
    Write-Host $port8080 -ForegroundColor Red
    
    $killProcess = Read-Host "Bạn có muốn kill process này không? (y/n)"
    if ($killProcess -eq 'y' -or $killProcess -eq 'Y') {
        $pid = ($port8080 -split '\s+')[4]
        Write-Host "Killing process PID: $pid" -ForegroundColor Yellow
        taskkill /PID $pid /F
        Write-Host "✅ Process đã được kill" -ForegroundColor Green
    }
} else {
    Write-Host "✅ Port 8080 không có process nào đang chạy" -ForegroundColor Green
}

# Bước 2: Kiểm tra backend directory
Write-Host "`n2️⃣ Kiểm tra backend directory..." -ForegroundColor Yellow
$backendPath = "Back-End (Final)/hienmauapi-main"

if (Test-Path $backendPath) {
    Write-Host "✅ Backend directory tồn tại: $backendPath" -ForegroundColor Green
    
    # Kiểm tra có mvnw không
    if (Test-Path "$backendPath/mvnw.cmd") {
        Write-Host "✅ Maven wrapper tồn tại" -ForegroundColor Green
    } else {
        Write-Host "❌ Không tìm thấy mvnw.cmd" -ForegroundColor Red
        Write-Host "💡 Hãy đảm bảo đây là Spring Boot project" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Không tìm thấy backend directory: $backendPath" -ForegroundColor Red
    Write-Host "💡 Hãy kiểm tra đường dẫn backend" -ForegroundColor Yellow
}

# Bước 3: Test API endpoint
Write-Host "`n3️⃣ Test API endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/blood-donation-activities" -Method GET -TimeoutSec 5
    Write-Host "✅ API endpoint trả về status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ API endpoint không khả dụng: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Backend server có thể chưa chạy" -ForegroundColor Yellow
}

# Bước 4: Test CORS headers
Write-Host "`n4️⃣ Test CORS headers..." -ForegroundColor Yellow
try {
    $corsResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/blood-donation-activities" -Method OPTIONS -Headers @{
        "Origin" = "http://localhost:5173"
        "Access-Control-Request-Method" = "GET"
        "Access-Control-Request-Headers" = "Content-Type"
    } -TimeoutSec 5
    
    $corsHeaders = $corsResponse.Headers
    if ($corsHeaders["Access-Control-Allow-Origin"]) {
        Write-Host "✅ CORS headers có sẵn: $($corsHeaders["Access-Control-Allow-Origin"])" -ForegroundColor Green
    } else {
        Write-Host "❌ Không có CORS headers" -ForegroundColor Red
        Write-Host "💡 Cần thêm CORS configuration vào backend" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ CORS test failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Bước 5: Hướng dẫn fix
Write-Host "`n5️⃣ Hướng dẫn khắc phục:" -ForegroundColor Yellow
Write-Host "📋 Nếu có lỗi CORS, hãy làm theo các bước sau:" -ForegroundColor Cyan
Write-Host "   1. Vào backend directory: cd '$backendPath'" -ForegroundColor White
Write-Host "   2. Tạo file CorsConfig.java với nội dung:" -ForegroundColor White
Write-Host "      @Configuration" -ForegroundColor Gray
Write-Host "      public class CorsConfig implements WebMvcConfigurer {" -ForegroundColor Gray
Write-Host "          @Override" -ForegroundColor Gray
Write-Host "          public void addCorsMappings(CorsRegistry registry) {" -ForegroundColor Gray
Write-Host "              registry.addMapping('/api/**')" -ForegroundColor Gray
Write-Host "                      .allowedOrigins('http://localhost:5173')" -ForegroundColor Gray
Write-Host "                      .allowedMethods('GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')" -ForegroundColor Gray
Write-Host "                      .allowedHeaders('*')" -ForegroundColor Gray
Write-Host "                      .allowCredentials(true);" -ForegroundColor Gray
Write-Host "          }" -ForegroundColor Gray
Write-Host "      }" -ForegroundColor Gray
Write-Host "   3. Start backend: ./mvnw spring-boot:run" -ForegroundColor White
Write-Host "   4. Test lại API" -ForegroundColor White

Write-Host "`n✅ Script hoàn thành!" -ForegroundColor Green
Write-Host "📖 Xem file CORS_ERROR_FIX.md để có hướng dẫn chi tiết" -ForegroundColor Cyan 