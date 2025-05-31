package com.blooddonatesupport.fap.service;

import com.blooddonatesupport.fap.dto.ChangePasswordRequest;
import com.blooddonatesupport.fap.dto.RegisterRequest;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.entity.ValidToken;
import com.blooddonatesupport.fap.repository.TokenRepository;
import com.blooddonatesupport.fap.repository.UserRepository;
import com.blooddonatesupport.fap.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public Optional<User> register(RegisterRequest req) {
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            return Optional.empty();
        }

        User user = new User();
        user.setHoVaTen(req.getHoVaTen());
        user.setTenDangNhap(req.getTenDangNhap());
        user.setMatKhauHash(passwordEncoder.encode(req.getMatKhau()));
        user.setEmail(req.getEmail());
        user.setVaiTro("USER");
        user.setProvider("local");

        return Optional.of(userRepository.save(user));
    }

    public Optional<String> login(String username, String password) {
        return userRepository.findByTenDangNhap(username)
                .filter(user -> passwordEncoder.matches(password, user.getMatKhauHash()))
                .map(user -> {
                    String token = jwtUtil.generateToken(user);
                    tokenRepository.save(new ValidToken(token, user.getMaNguoiDung()));
                    return token;
                });
    }

    public boolean changePassword(User user, ChangePasswordRequest req) {
        if (!passwordEncoder.matches(req.getOldPassword(), user.getMatKhauHash())) {
            return false;
        }

        user.setMatKhauHash(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);

        tokenRepository.deleteAllByUserId(user.getMaNguoiDung());
        return true;
    }

    public void logout(String token, User user) {
        tokenRepository.deleteByTokenAndUserId(token, user.getMaNguoiDung());
    }
}