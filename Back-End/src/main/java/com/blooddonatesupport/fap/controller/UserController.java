package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.ErrorResponse;
import com.blooddonatesupport.fap.dto.UserProfileDTO;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    private UserProfileDTO convertToDTO(User user) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setFullName(user.getFullName());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setDateOfBirth(user.getDateOfBirth());
        dto.setGender(user.getGender());
        dto.setAddress(user.getAddress());
        dto.setBloodType(user.getBloodType());
        dto.setRhFactor(user.getRhFactor());
        dto.setMedicalHistory(user.getMedicalHistory());
        dto.setWeight(user.getWeight());
        dto.setHeight(user.getHeight());
        dto.setCurrentHealthStatus(user.getCurrentHealthStatus());
        return dto;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));
        UserProfileDTO dto = convertToDTO(user);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/profile/update")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                                           @Valid @RequestBody UserProfileDTO updateRequest) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));
        user.setFullName(updateRequest.getFullName());
        user.setPhoneNumber(updateRequest.getPhoneNumber());
        user.setDateOfBirth(updateRequest.getDateOfBirth());
        user.setGender(updateRequest.getGender());
        user.setAddress(updateRequest.getAddress());
        user.setBloodType(updateRequest.getBloodType());
        user.setRhFactor(updateRequest.getRhFactor());
        user.setMedicalHistory(updateRequest.getMedicalHistory());
        user.setWeight(updateRequest.getWeight());
        user.setHeight(updateRequest.getHeight());
        user.setCurrentHealthStatus(updateRequest.getCurrentHealthStatus());
        userRepository.save(user);
        return ResponseEntity.ok(new ErrorResponse(200, "Cập nhật hồ sơ thành công"));
    }
}