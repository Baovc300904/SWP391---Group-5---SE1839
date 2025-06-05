package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.ChangePasswordRequest;
import com.blooddonatesupport.fap.dto.ErrorResponse;
import com.blooddonatesupport.fap.dto.LoginRequest;
import com.blooddonatesupport.fap.dto.RegisterRequest;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.entity.ValidToken;
import com.blooddonatesupport.fap.repository.UserRepository;
import com.blooddonatesupport.fap.repository.TokenRepository;
import com.blooddonatesupport.fap.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

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
        userRepository.save(user);

        return ResponseEntity.ok(new ErrorResponse(200, "Đăng ký thành công"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        return userRepository.findByUsername(req.getUsername())
                .filter(user -> passwordEncoder.matches(req.getPassword(), user.getPassword()))
                .<ResponseEntity<?>>map(user -> {
                    String token = jwtUtil.generateToken(user);
                    tokenRepository.save(new ValidToken(token, user.getUserId()));
                    return ResponseEntity.ok(Map.of("token", token));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ErrorResponse(401, "Sai thông tin đăng nhập")));
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