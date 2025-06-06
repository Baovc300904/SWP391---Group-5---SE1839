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

import java.time.LocalDateTime;
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
        user.setFullName(req.getFullName());
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setEmail(req.getEmail());
        user.setRole("USER");
        user.setProvider("local");

        return Optional.of(userRepository.save(user));
    }

    public Optional<String> login(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(user -> {
                    String token = jwtUtil.generateToken(user);

                    ValidToken validToken = new ValidToken();
                    validToken.setToken(token);
                    validToken.setUser(user);
                    validToken.setExpiryDate(LocalDateTime.now().plusHours(24));

                    tokenRepository.save(validToken);

                    return token;
                });
    }

    public boolean changePassword(User user, ChangePasswordRequest req) {
        if (!passwordEncoder.matches(req.getOldPassword(), user.getPassword())) {
            return false;
        }

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);

        tokenRepository.deleteAllByUserId(user.getUserId());
        return true;
    }


    public void logout(String token, User user) {
        tokenRepository.deleteByTokenAndUserId(token, user.getUserId());
    }
}