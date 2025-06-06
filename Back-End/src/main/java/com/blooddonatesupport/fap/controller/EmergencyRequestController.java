package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.EmergencyRequestDTO;
import com.blooddonatesupport.fap.entity.EmergencyRequest;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.service.EmergencyRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/emergency")
@RequiredArgsConstructor
public class EmergencyRequestController {

    private final EmergencyRequestService service;

    @PostMapping
    public ResponseEntity<EmergencyRequest> create(@Valid @RequestBody EmergencyRequestDTO dto,
                                                   @AuthenticationPrincipal User user) {
        EmergencyRequest request = service.createEmergency(dto, user);
        return ResponseEntity.ok(request);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<List<EmergencyRequest>> getAll() {
        List<EmergencyRequest> requests = service.getAll();
        return ResponseEntity.ok(requests);
    }
}