package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.entity.DonationRegistration;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.repository.DonationRegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
@RequiredArgsConstructor
public class DonationRegistrationController {

    private final DonationRegistrationRepository repository;

    @GetMapping("/my")
    public ResponseEntity<List<DonationRegistration>> getMyRegistrations(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(repository.findByUser(user));
    }

    @PostMapping
    public ResponseEntity<DonationRegistration> register(@RequestBody DonationRegistration request,
                                                         @AuthenticationPrincipal User user) {
        request.setUser(user);
        request.setStatus("Dang Cho");
        return ResponseEntity.ok(repository.save(request));
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<DonationRegistration> approve(@PathVariable Long id) {
        DonationRegistration request = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy yêu cầu"));
        request.setStatus("Da Duyet");
        return ResponseEntity.ok(repository.save(request));
    }
}
