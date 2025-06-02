package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.DonationRegistrationRequest;
import com.blooddonatesupport.fap.entity.DonationRegistration;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/donations")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @PostMapping("/register")
    public DonationRegistration register(@RequestBody DonationRegistrationRequest request,
                                         @AuthenticationPrincipal User user) {
        return donationService.registerDonation(request, user);
    }

    @GetMapping("/mine")
    public List<DonationRegistration> getMyDonations(@AuthenticationPrincipal User user) {
        return donationService.getMyDonations(user);
    }
}
