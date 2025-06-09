package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.ChangePasswordRequest;
import com.blooddonatesupport.fap.dto.ErrorResponse;
import com.blooddonatesupport.fap.dto.LoginRequest;
import com.blooddonatesupport.fap.dto.RegisterRequest;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.entity.User.AccountStatus;
import com.blooddonatesupport.fap.entity.User.Role;
import com.blooddonatesupport.fap.entity.ValidToken;
import com.blooddonatesupport.fap.repository.UserRepository;
import com.blooddonatesupport.fap.repository.TokenRepository;
import com.blooddonatesupport.fap.security.JwtUtil;
import com.blooddonatesupport.fap.service.EmailService;
import com.blooddonatesupport.fap.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        try {
            // ✅ Sử dụng UserService thay vì logic trực tiếp
            Optional<User> userOpt = userService.register(req);

            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse(400, "Email hoặc username đã tồn tại"));
            }

            User user = userOpt.get();

            // ✅ Tạo token xác nhận
            String token = UUID.randomUUID().toString();

            ValidToken validToken = new ValidToken();
            validToken.setToken(token);
            validToken.setUser(user);
            validToken.setExpiryDate(LocalDateTime.now().plusHours(24));

            tokenRepository.save(validToken);

            // ✅ Gửi email xác nhận
            String link = "http://localhost:8080/auth/verify?token=" + token;
            emailService.sendEmail(
                    user.getEmail(),
                    "Xác nhận tài khoản",
                    "Vui lòng nhấn vào liên kết sau để xác nhận tài khoản của bạn: " + link
            );

            return ResponseEntity.ok(new ErrorResponse(200, "Đăng ký thành công. Vui lòng kiểm tra email để xác nhận tài khoản."));
        } catch (Exception e) {
            log.error("Error during registration: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        try {
            // ✅ Sử dụng findByEmailOrUsername để hỗ trợ cả email và username
            return userRepository.findByEmailOrUsername(req.getUsername())
                    .filter(user -> passwordEncoder.matches(req.getPassword(), user.getPassword()))
                    .<ResponseEntity<?>>map(user -> {
                        // ✅ Sử dụng enum đúng cách
                        if (!AccountStatus.Hoat_Dong.equals(user.getAccountStatus())) {
                            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                    .body(new ErrorResponse(403, "Tài khoản chưa được kích hoạt."));
                        }

                        String token = jwtUtil.generateToken(user);

                        ValidToken validToken = new ValidToken();
                        validToken.setToken(token);
                        validToken.setUser(user);
                        validToken.setExpiryDate(LocalDateTime.now().plusHours(24));

                        tokenRepository.save(validToken);

                        log.info("User logged in successfully: {}", user.getEmail());

                        // ✅ Sử dụng HashMap thay vì Map.of() để tránh giới hạn tham số
                        Map<String, Object> userInfo = new HashMap<>();
                        userInfo.put("id", user.getUserId());
                        userInfo.put("username", user.getUsername());
                        userInfo.put("email", user.getEmail());
                        userInfo.put("fullName", user.getFullName());
                        userInfo.put("role", user.getRole().getDisplayName());

                        Map<String, Object> response = new HashMap<>();
                        response.put("token", token);
                        response.put("user", userInfo);

                        return ResponseEntity.ok(response);
                    })
                    .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(new ErrorResponse(401, "Sai thông tin đăng nhập")));
        } catch (Exception e) {
            log.error("Error during login: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam("token") String token) {
        try {
            Optional<ValidToken> validTokenOpt = tokenRepository.findByToken(token);

            if (validTokenOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("Token không hợp lệ.");
            }

            ValidToken validToken = validTokenOpt.get();

            if (validToken.getExpiryDate().isBefore(LocalDateTime.now())) {
                return ResponseEntity.badRequest()
                        .body("Token đã hết hạn.");
            }

            User user = validToken.getUser();

            // ✅ Sử dụng enum đúng cách
            user.setAccountStatus(AccountStatus.Hoat_Dong);
            userRepository.save(user);

            // ✅ Xóa token sau khi xác minh
            tokenRepository.deleteById(token);

            log.info("Account verified successfully: {}", user.getEmail());
            return ResponseEntity.ok("Tài khoản đã được kích hoạt thành công.");
        } catch (Exception e) {
            log.error("Error during verification: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi hệ thống");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String bearerToken) {
        try {
            if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse(400, "Token không hợp lệ"));
            }

            String token = bearerToken.substring(7);

            // ✅ Sử dụng phương thức đúng để kiểm tra token
            if (!tokenRepository.existsByToken(token)) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse(400, "Token không tồn tại"));
            }

            tokenRepository.deleteById(token);
            log.info("User logged out with token: {}", token.substring(0, Math.min(10, token.length())) + "...");
            return ResponseEntity.ok(new ErrorResponse(200, "Đăng xuất thành công"));
        } catch (Exception e) {
            log.error("Error during logout: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest req,
                                            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

            // ✅ Sử dụng UserService để xử lý logic nghiệp vụ
            boolean success = userService.changePassword(user, req);

            if (!success) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new ErrorResponse(403, "Sai mật khẩu cũ"));
            }

            return ResponseEntity.ok(new ErrorResponse(200, "Mật khẩu đã được đổi. Vui lòng đăng nhập lại."));
        } catch (Exception e) {
            log.error("Error during password change: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    // ===============================
    // = ADDITIONAL ENDPOINTS
    // ===============================

    @PostMapping("/resend-verification")
    public ResponseEntity<?> resendVerification(@RequestParam String email) {
        try {
            Optional<User> userOpt = userRepository.findByEmailAndAccountStatus(
                    email, AccountStatus.Cho_Kich_Hoat
            );

            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse(400, "Không tìm thấy tài khoản cần kích hoạt"));
            }

            User user = userOpt.get();

            // Tạo token xác nhận mới
            String token = UUID.randomUUID().toString();
            ValidToken validToken = new ValidToken();
            validToken.setToken(token);
            validToken.setUser(user);
            validToken.setExpiryDate(LocalDateTime.now().plusHours(24));

            tokenRepository.save(validToken);

            // Gửi email xác nhận
            String link = "http://localhost:8080/auth/verify?token=" + token;
            emailService.sendEmail(
                    user.getEmail(),
                    "Xác nhận tài khoản",
                    "Vui lòng nhấn vào liên kết sau để xác nhận tài khoản của bạn: " + link
            );

            return ResponseEntity.ok(new ErrorResponse(200, "Email xác nhận đã được gửi lại"));
        } catch (Exception e) {
            log.error("Error resending verification: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

            // ✅ Sử dụng HashMap thay vì Map.of() để tránh giới hạn tham số
            Map<String, Object> profile = new HashMap<>();
            profile.put("id", user.getUserId());
            profile.put("username", user.getUsername());
            profile.put("email", user.getEmail());
            profile.put("fullName", user.getFullName());
            profile.put("role", user.getRole().getDisplayName());
            profile.put("accountStatus", user.getAccountStatus().getDisplayName());
            profile.put("registrationDate", user.getRegistrationDate());
            profile.put("phoneNumber", user.getPhoneNumber() != null ? user.getPhoneNumber() : "");
            profile.put("dateOfBirth", user.getDateOfBirth());
            profile.put("gender", user.getGender() != null ? user.getGender().getDisplayName() : "");
            profile.put("address", user.getAddress() != null ? user.getAddress() : "");
            profile.put("bloodGroupId", user.getBloodGroupId());
            profile.put("rhFactor", user.getRhFactor() != null ? user.getRhFactor().getValue() : "");
            profile.put("weight", user.getWeight());
            profile.put("height", user.getHeight());
            profile.put("currentHealthStatus", user.getCurrentHealthStatus() != null ? user.getCurrentHealthStatus().getDisplayName() : "");

            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            log.error("Error getting profile: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        try {
            Optional<User> userOpt = userRepository.findByEmailAndAccountStatus(
                    email, AccountStatus.Hoat_Dong
            );

            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse(400, "Không tìm thấy tài khoản với email này"));
            }

            User user = userOpt.get();

            // Tạo token reset password
            String token = UUID.randomUUID().toString();
            ValidToken validToken = new ValidToken();
            validToken.setToken(token);
            validToken.setUser(user);
            validToken.setExpiryDate(LocalDateTime.now().plusHours(1)); // 1 hour for password reset

            tokenRepository.save(validToken);

            // Gửi email reset password
            String link = "http://localhost:8080/reset-password?token=" + token;
            emailService.sendEmail(
                    user.getEmail(),
                    "Đặt lại mật khẩu",
                    "Vui lòng nhấn vào liên kết sau để đặt lại mật khẩu của bạn: " + link + "\n\nLiên kết này sẽ hết hạn sau 1 giờ."
            );

            return ResponseEntity.ok(new ErrorResponse(200, "Email đặt lại mật khẩu đã được gửi"));
        } catch (Exception e) {
            log.error("Error sending forgot password email: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token,
                                           @RequestParam String newPassword) {
        try {
            Optional<ValidToken> validTokenOpt = tokenRepository.findByToken(token);

            if (validTokenOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse(400, "Token không hợp lệ"));
            }

            ValidToken validToken = validTokenOpt.get();

            if (validToken.getExpiryDate().isBefore(LocalDateTime.now())) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse(400, "Token đã hết hạn"));
            }

            User user = validToken.getUser();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

            // Xóa tất cả tokens của user (force logout everywhere)
            tokenRepository.deleteAllByUserUserId(user.getUserId());

            log.info("Password reset successfully for user: {}", user.getEmail());
            return ResponseEntity.ok(new ErrorResponse(200, "Mật khẩu đã được đặt lại thành công"));
        } catch (Exception e) {
            log.error("Error resetting password: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }
}