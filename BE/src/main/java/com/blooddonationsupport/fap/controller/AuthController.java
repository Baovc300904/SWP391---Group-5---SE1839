package BE.src.main.java.com.blooddonationsupport.fap.controller;

import com.blooddonationsupport.fap.dto.LoginRequest;
import com.blooddonationsupport.fap.dto.RegisterRequest;
import com.blooddonationsupport.fap.entity.User;
import com.blooddonationsupport.fap.repository.UserRepository;
import com.blooddonationsupport.fap.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email đã tồn tại");
        }

        User user = new User();
        user.setHoVaTen(req.getHoVaTen());
        user.setTenDangNhap(req.getTenDangNhap());
        user.setMatKhauHash(passwordEncoder.encode(req.getMatKhau()));
        user.setEmail(req.getEmail());
        user.setVaiTro("USER");
        user.setProvider("local");
        userRepository.save(user);
        return ResponseEntity.ok("Đăng ký thành công");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return userRepository.findByTenDangNhap(req.getTenDangNhap())
                .filter(user -> passwordEncoder.matches(req.getMatKhau(), user.getMatKhauHash()))
                .<ResponseEntity<?>>map(user -> ResponseEntity.ok(Map.of("token", jwtUtil.generateToken(user))))
                .orElse(ResponseEntity.status(401).body(Map.of("message", "Sai thông tin đăng nhập")));

    }
}