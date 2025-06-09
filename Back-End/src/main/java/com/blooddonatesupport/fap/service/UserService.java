package com.blooddonatesupport.fap.service;

import com.blooddonatesupport.fap.dto.ChangePasswordRequest;
import com.blooddonatesupport.fap.dto.RegisterRequest;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.entity.User.AccountStatus;
import com.blooddonatesupport.fap.entity.User.Role;
import com.blooddonatesupport.fap.entity.ValidToken;
import com.blooddonatesupport.fap.repository.TokenRepository;
import com.blooddonatesupport.fap.repository.UserRepository;
import com.blooddonatesupport.fap.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

import com.blooddonatesupport.fap.service.EmailService;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    // Enhanced register method
    @Transactional
    public Optional<User> register(RegisterRequest req) {
        try {
            // Check if email already exists
            if (userRepository.existsByEmail(req.getEmail())) {
                log.warn("Attempted to register with existing email: {}", req.getEmail());
                return Optional.empty();
            }

            // Check if username already exists
            if (userRepository.existsByUsername(req.getUsername())) {
                log.warn("Attempted to register with existing username: {}", req.getUsername());
                return Optional.empty();
            }

            User user = new User();
            user.setFullName(req.getFullName());
            user.setUsername(req.getUsername());
            user.setPassword(passwordEncoder.encode(req.getPassword()));
            user.setEmail(req.getEmail());
            user.setRole(Role.Thanh_Vien);
            user.setAccountStatus(AccountStatus.Cho_Kich_Hoat);
            user.setRegistrationDate(LocalDateTime.now());
            user.setProvider("local");

            User savedUser = userRepository.save(user);
            log.info("User registered successfully: {}", savedUser.getEmail());
            return Optional.of(savedUser);
        } catch (Exception e) {
            log.error("Error during user registration: {}", e.getMessage(), e);
            throw new RuntimeException("Lỗi trong quá trình đăng ký", e);
        }
    }
    // Trong UserService.java
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional
    public Optional<String> login(String credential, String password) {
        try {
            return userRepository.findByEmailOrUsername(credential)
                    .filter(user -> {
                        // Check if account is active
                        if (!user.canLogin()) {
                            log.warn("Login attempt for inactive account: {}", credential);
                            return false;
                        }
                        return passwordEncoder.matches(password, user.getPassword());
                    })
                    .map(user -> {
                        String token = jwtUtil.generateToken(user);

                        ValidToken validToken = new ValidToken();
                        validToken.setToken(token);
                        validToken.setUser(user);
                        validToken.setExpiryDate(LocalDateTime.now().plusHours(24));

                        tokenRepository.save(validToken);
                        log.info("User logged in successfully: {}", user.getEmail());
                        return token;
                    });
        } catch (Exception e) {
            log.error("Error during user login: {}", e.getMessage(), e);
            throw new RuntimeException("Lỗi trong quá trình đăng nhập", e);
        }
    }

    @Transactional
    public boolean changePassword(User user, ChangePasswordRequest req) {
        try {
            if (!passwordEncoder.matches(req.getOldPassword(), user.getPassword())) {
                log.warn("Invalid old password for user: {}", user.getEmail());
                return false;
            }

            user.setPassword(passwordEncoder.encode(req.getNewPassword()));
            userRepository.save(user);

            // Use Integer-based method
            tokenRepository.deleteAllByUserUserId(user.getUserId());
            log.info("Password changed successfully for user: {}", user.getEmail());
            return true;
        } catch (Exception e) {
            log.error("Error during password change: {}", e.getMessage(), e);
            throw new RuntimeException("Lỗi trong quá trình đổi mật khẩu", e);
        }
    }

    @Transactional
    public void logout(String token, User user) {
        try {
            // Use Integer-based method
            tokenRepository.deleteByTokenAndUserUserId(token, user.getUserId());
            log.info("User logged out successfully: {}", user.getEmail());
        } catch (Exception e) {
            log.error("Error during logout: {}", e.getMessage(), e);
            throw new RuntimeException("Lỗi trong quá trình đăng xuất", e);
        }
    }


    // ===============================
    // = ADDITIONAL HELPER METHODS
    // ===============================

    @Transactional
    public User activateAccount(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản"));

        if (user.getAccountStatus() != AccountStatus.Cho_Kich_Hoat) {
            throw new RuntimeException("Tài khoản không ở trạng thái chờ kích hoạt");
        }

        user.setAccountStatus(AccountStatus.Hoat_Dong);
        User activated = userRepository.save(user);

        log.info("Account activated: {}", email);
        return activated;
    }

    @Transactional
    public User blockAccount(Integer userId, String reason) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        user.setAccountStatus(AccountStatus.Khoa);
        User blocked = userRepository.save(user);

        // Invalidate all tokens for blocked user
        tokenRepository.deleteAllByUserUserId(userId); // ✅ sửa tại đây

        log.info("Account blocked: {} - Reason: {}", user.getUsername(), reason);
        return blocked;
    }

    public Optional<User> findActiveUserByEmail(String email) {
        return userRepository.findByEmailAndAccountStatus(email, AccountStatus.Hoat_Dong);
    }

    public boolean isValidUser(Integer userId) {
        return userRepository.findById(userId)
                .map(User::canLogin)
                .orElse(false);
    }
}