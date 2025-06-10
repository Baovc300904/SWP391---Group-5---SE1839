package com.demobe.demobe.service;

import com.demobe.demobe.dto.LoginRequest;
import com.demobe.demobe.dto.LoginResponse;
import com.demobe.demobe.dto.RegisterRequest;
import com.demobe.demobe.entity.User;
import com.demobe.demobe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isEmpty()) {
            return new LoginResponse("Email không tồn tại", null, null);
        }

        User user = userOpt.get();

        // So sánh mật khẩu gốc với hash đã lưu
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
            return new LoginResponse("Sai mật khẩu", null, null);
        }

        return new LoginResponse("Đăng nhập thành công", user.getUsername(), user.getRole().name());
    }

//    public User createUser(User user) {
//        // Mã hóa mật khẩu trước khi lưu
//        String hashedPassword = passwordEncoder.encode(user.getPasswordHash());
//        user.setPasswordHash(hashedPassword);
//
//        // Set mặc định (nếu chưa có)
//        if (user.getRegistrationDate() == null) {
//            user.setRegistrationDate(LocalDateTime.now());
//        }
//        if (user.getAccountStatus() == null) {
//            user.setAccountStatus(User.AccountStatus.Hoat_Dong);
//        }
//
//        return userRepository.save(user);
//    }

    public User registerUser(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setRole(User.Role.Thanh_Vien); // Hoặc mặc định
        return userRepository.save(user);
    }
}
