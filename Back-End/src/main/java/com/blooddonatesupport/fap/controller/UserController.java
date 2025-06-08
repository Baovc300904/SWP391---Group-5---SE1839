package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.ErrorResponse;
import com.blooddonatesupport.fap.dto.UserProfileDTO;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserRepository userRepository;

    // ✅ Sửa method convertToDTO để map đúng các field
    private UserProfileDTO convertToDTO(User user) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setFullName(user.getFullName());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setDateOfBirth(user.getDateOfBirth());
        dto.setGender(user.getGender());
        dto.setAddress(user.getAddress());
        dto.setBloodGroupId(user.getBloodGroupId()); // ✅ Sử dụng bloodGroupId
        dto.setRhFactor(user.getRhFactor());
        dto.setMedicalHistory(user.getMedicalHistory());
        dto.setWeight(user.getWeight());
        dto.setHeight(user.getHeight());
        dto.setCurrentHealthStatus(user.getCurrentHealthStatus());
        return dto;
    }

    // ✅ Sửa method updateUserFromDTO để map đúng các field
    private void updateUserFromDTO(User user, UserProfileDTO dto) {
        if (dto.getFullName() != null) {
            user.setFullName(dto.getFullName());
        }
        if (dto.getPhoneNumber() != null) {
            user.setPhoneNumber(dto.getPhoneNumber());
        }
        if (dto.getDateOfBirth() != null) {
            user.setDateOfBirth(dto.getDateOfBirth());
        }
        if (dto.getGender() != null) {
            user.setGender(dto.getGender());
        }
        if (dto.getAddress() != null) {
            user.setAddress(dto.getAddress());
        }
        if (dto.getBloodGroupId() != null) {
            user.setBloodGroupId(dto.getBloodGroupId()); // ✅ Sử dụng bloodGroupId
        }
        if (dto.getRhFactor() != null) {
            user.setRhFactor(dto.getRhFactor());
        }
        if (dto.getMedicalHistory() != null) {
            user.setMedicalHistory(dto.getMedicalHistory());
        }
        if (dto.getWeight() != null) {
            user.setWeight(dto.getWeight());
        }
        if (dto.getHeight() != null) {
            user.setHeight(dto.getHeight());
        }
        if (dto.getCurrentHealthStatus() != null) {
            user.setCurrentHealthStatus(dto.getCurrentHealthStatus());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

            UserProfileDTO dto = convertToDTO(user);

            // ✅ Trả về response với thông tin đầy đủ
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Lấy thông tin hồ sơ thành công");
            response.put("data", dto);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error getting user profile: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    @PutMapping("/profile/update")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                                           @Valid @RequestBody UserProfileDTO updateRequest,
                                           BindingResult bindingResult) {
        try {
            // ✅ Kiểm tra validation errors
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = new HashMap<>();
                bindingResult.getFieldErrors().forEach(error ->
                        errors.put(error.getField(), error.getDefaultMessage())
                );

                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Dữ liệu không hợp lệ");
                response.put("errors", errors);

                return ResponseEntity.badRequest().body(response);
            }

            User user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

            // ✅ Sử dụng method helper để update
            updateUserFromDTO(user, updateRequest);

            User savedUser = userRepository.save(user);
            log.info("User profile updated successfully: {}", user.getEmail());

            // ✅ Trả về thông tin user đã được cập nhật
            UserProfileDTO updatedDto = convertToDTO(savedUser);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Cập nhật hồ sơ thành công");
            response.put("data", updatedDto);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error updating user profile: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    @GetMapping("/profile/basic")
    public ResponseEntity<?> getBasicProfile(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

            Map<String, Object> basicInfo = new HashMap<>();
            basicInfo.put("id", user.getUserId());
            basicInfo.put("username", user.getUsername());
            basicInfo.put("email", user.getEmail());
            basicInfo.put("fullName", user.getFullName());
            basicInfo.put("role", user.getRole().getDisplayName());
            basicInfo.put("accountStatus", user.getAccountStatus().getDisplayName());

            return ResponseEntity.ok(basicInfo);
        } catch (Exception e) {
            log.error("Error getting basic profile: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    @GetMapping("/health-info")
    public ResponseEntity<?> getHealthInfo(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));

            Map<String, Object> healthInfo = new HashMap<>();
            healthInfo.put("bloodGroupId", user.getBloodGroupId());
            healthInfo.put("rhFactor", user.getRhFactor() != null ? user.getRhFactor().getValue() : null);
            healthInfo.put("weight", user.getWeight());
            healthInfo.put("height", user.getHeight());
            healthInfo.put("currentHealthStatus", user.getCurrentHealthStatus() != null ?
                    user.getCurrentHealthStatus().getDisplayName() : null);
            healthInfo.put("medicalHistory", user.getMedicalHistory());

            return ResponseEntity.ok(healthInfo);
        } catch (Exception e) {
            log.error("Error getting health info: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }
}