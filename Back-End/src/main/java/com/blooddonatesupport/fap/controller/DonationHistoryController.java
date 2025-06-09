package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.entity.DonationHistory;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.repository.DonationHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/donation-history")
@RequiredArgsConstructor
public class DonationHistoryController {

    private final DonationHistoryRepository repository;

    @GetMapping("/my")
    public ResponseEntity<List<DonationHistory>> getMyHistory(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(repository.findByUser(user));
    }
}