package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.DonationRegistrationRequest;
import com.blooddonatesupport.fap.dto.ErrorResponse;
import com.blooddonatesupport.fap.entity.DonationRegistration;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.service.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
public class DonationController {

    private final DonationService donationService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody DonationRegistrationRequest request,
                                      @AuthenticationPrincipal User user) {

        // Check weight eligibility - handle BigDecimal and null cases
        if (user.getWeight() == null ||
                user.getWeight().compareTo(BigDecimal.valueOf(45)) < 0 ||
                !"GOOD".equals(user.getCurrentHealthStatus())) {

            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(400, "Không đủ điều kiện hiến máu"));
        }

        DonationRegistration registration = donationService.registerDonation(request, user);
        return ResponseEntity.ok(registration);
    }

    @GetMapping("/mine")
    public ResponseEntity<List<DonationRegistration>> getMyDonations(@AuthenticationPrincipal User user) {
        List<DonationRegistration> donations = donationService.getMyDonations(user);
        return ResponseEntity.ok(donations);
    }
}