package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.ChangePasswordRequest;
import com.blooddonatesupport.fap.dto.ErrorResponse;
import com.blooddonatesupport.fap.dto.LoginRequest;
import com.blooddonatesupport.fap.dto.RegisterRequest;
import com.blooddonatesupport.fap.entity.AccountStatus;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.entity.ValidToken;
import com.blooddonatesupport.fap.repository.UserRepository;
import com.blooddonatesupport.fap.repository.TokenRepository;
import com.blooddonatesupport.fap.security.JwtUtil;
import com.blooddonatesupport.fap.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(400, "Email đã tồn tại"));
        }

        User user = new User();
        user.setFullName(req.getFullName());
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setEmail(req.getEmail());
        user.setRole("USER");
        user.setProvider("local");
        user.setAccountStatus(AccountStatus.ChoKichHoat);
        userRepository.save(user);

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
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        return userRepository.findByUsername(req.getUsername())
                .filter(user -> passwordEncoder.matches(req.getPassword(), user.getPassword()))
                .<ResponseEntity<?>>map(user -> {
                    if (!AccountStatus.HoatDong.equals(user.getAccountStatus())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body(new ErrorResponse(403, "Tài khoản chưa được kích hoạt."));
                    }

                    String token = jwtUtil.generateToken(user);
                    tokenRepository.save(new ValidToken(token, LocalDateTime.now().plusHours(24), user)); // nếu muốn, có thể dùng constructor này
                    return ResponseEntity.ok(Map.of("token", token));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ErrorResponse(401, "Sai thông tin đăng nhập")));
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam("token") String token) {
        Optional<ValidToken> validToken = tokenRepository.findByToken(token);
        if (validToken.isEmpty() || validToken.get().getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token không hợp lệ hoặc đã hết hạn.");
        }

        User user = validToken.get().getUser();
        user.setAccountStatus(AccountStatus.HoatDong);
        userRepository.save(user);

        // Có thể xóa token sau khi xác minh
        tokenRepository.deleteById(token);

        return ResponseEntity.ok("Tài khoản đã được kích hoạt thành công.");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String bearerToken) {
        if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(400, "Token không hợp lệ"));
        }

        String token = bearerToken.substring(7);
        if (!tokenRepository.existsById(token)) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(400, "Token không tồn tại"));
        }

        tokenRepository.deleteById(token);
        return ResponseEntity.ok(new ErrorResponse(200, "Đăng xuất thành công"));
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest req,
                                            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

        if (!passwordEncoder.matches(req.getOldPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ErrorResponse(403, "Sai mật khẩu cũ"));
        }

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);
        tokenRepository.deleteAllByUserId(user.getUserId());

        return ResponseEntity.ok(new ErrorResponse(200, "Mật khẩu đã được đổi. Vui lòng đăng nhập lại."));
    }
}
