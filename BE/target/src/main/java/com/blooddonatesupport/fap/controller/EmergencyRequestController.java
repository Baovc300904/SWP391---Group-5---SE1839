package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.EmergencyRequestDTO;
import com.blooddonatesupport.fap.entity.EmergencyRequest;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.service.EmergencyRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergency")
@RequiredArgsConstructor
public class EmergencyRequestController {

    private final EmergencyRequestService service;

    @PostMapping
    public void create(@RequestBody EmergencyRequestDTO dto,
                       @AuthenticationPrincipal User user) {
        service.createEmergency(dto, user);
    }

    @GetMapping
    public List<EmergencyRequest> getAll() {
        return service.getAll();
    }
}
