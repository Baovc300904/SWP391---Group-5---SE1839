package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.entity.StaffProfile;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.repository.StaffProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/staff-profile")
@RequiredArgsConstructor
public class StaffProfileController {

    private final StaffProfileRepository repository;

    @GetMapping("/my")
    public ResponseEntity<StaffProfile> getMyProfile(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
                repository.findByUser(user).orElseThrow(() -> new RuntimeException("Không tìm thấy hồ sơ nhân viên."))
        );
    }
}
