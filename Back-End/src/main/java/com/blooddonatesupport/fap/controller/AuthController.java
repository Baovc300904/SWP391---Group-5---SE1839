package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.ChangePasswordRequest;
import com.blooddonatesupport.fap.dto.LoginRequest;
import com.blooddonatesupport.fap.dto.RegisterRequest;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.entity.ValidToken;
import com.blooddonatesupport.fap.repository.UserRepository;
import com.blooddonatesupport.fap.repository.TokenRepository;
import com.blooddonatesupport.fap.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email đã tồn tại");
        }

        User user = new User();
        user.setFullName(req.getFullName());
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setEmail(req.getEmail());
        user.setRole("USER");
        user.setProvider("local");
        userRepository.save(user);

        return ResponseEntity.ok("Đăng ký thành công");
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return userRepository.findByTenDangNhap(req.getUsername())
                .filter(user -> passwordEncoder.matches(req.getPassword(), user.getPassword()))
                .<ResponseEntity<?>>map(user -> {
                    String token = jwtUtil.generateToken(user);
                    tokenRepository.save(new ValidToken(token, user.getUserId()));
                    return ResponseEntity.ok(Map.of("token", token));
                })
                .orElse(ResponseEntity.status(401).body(Map.of("message", "Sai thông tin đăng nhập")));
    }

    // LOGOUT
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String bearerToken) {
        if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Token không hợp lệ");
        }

        String token = bearerToken.substring(7); // remove "Bearer "
        tokenRepository.deleteById(token);

        return ResponseEntity.ok("Đăng xuất thành công");
    }
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest req,
                                            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByTenDangNhap(userDetails.getUsername()).orElseThrow();

        if (!passwordEncoder.matches(req.getOldPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sai mật khẩu cũ");
        }

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);

        // Xoá tất cả token cũ của user
        tokenRepository.deleteAllByUserId(user.getUserId());

        return ResponseEntity.ok("Mật khẩu đã được đổi. Vui lòng đăng nhập lại.");
    }
}