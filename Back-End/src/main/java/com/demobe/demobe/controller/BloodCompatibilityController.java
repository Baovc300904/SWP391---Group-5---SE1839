package com.demobe.demobe.controller;

import com.demobe.demobe.service.BloodCompatibilityService;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/blood-compatibility")
public class BloodCompatibilityController {

    private final BloodCompatibilityService bloodCompatibilityService;

    public BloodCompatibilityController(BloodCompatibilityService bloodCompatibilityService) {
        this.bloodCompatibilityService = bloodCompatibilityService;
    }

    @GetMapping("/compatible")
    public Set<String> getCompatibleDonors(
            @RequestParam String recipientBloodGroup,
            @RequestParam(defaultValue = "whole") String component
    ) {
        return bloodCompatibilityService.findCompatibleBloodGroups(recipientBloodGroup.toUpperCase(), component);
    }
}

