package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.UserProfileDTO;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private UserProfileDTO convertToDTO(User user) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setHoVaTen(user.getHoVaTen());
        dto.setSoDienThoai(user.getSoDienThoai());
        dto.setNgaySinh(user.getNgaySinh());
        dto.setGioiTinh(user.getGioiTinh());
        dto.setDiaChi(user.getDiaChi());
        dto.setMaNhomMau(user.getMaNhomMau());
        dto.setYeuToRh(user.getYeuToRh());
        dto.setTienSuBenh(user.getTienSuBenh());
        dto.setCanNang(user.getCanNang());
        dto.setChieuCao(user.getChieuCao());
        dto.setTinhTrangSucKhoeHienTai(user.getTinhTrangSucKhoeHienTai());
        return dto;
    }
    // Lấy hồ sơ người dùng hiện tại
    @GetMapping("/api/user/profile")
    public ResponseEntity<UserProfileDTO> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByTenDangNhap(userDetails.getUsername()).orElseThrow();
        UserProfileDTO dto = convertToDTO(user);
        return ResponseEntity.ok(dto);
    }

    // Cập nhật hồ sơ người dùng hiện tại
    @PutMapping("/api/user/profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                                           @RequestBody UserProfileDTO updateRequest) {
        User user = userRepository.findByTenDangNhap(userDetails.getUsername()).orElseThrow();
        user.setHoVaTen(updateRequest.getHoVaTen());
        user.setDiaChi(updateRequest.getDiaChi());
        // ... cập nhật các trường còn lại
        userRepository.save(user);
        return ResponseEntity.ok("Cập nhật thành công");
    }

}