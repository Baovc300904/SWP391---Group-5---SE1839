package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.BloodRequestDTO;
import com.blooddonatesupport.fap.dto.ErrorResponse;
import com.blooddonatesupport.fap.entity.BloodRequest;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.service.BloodRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/request")
@RequiredArgsConstructor
public class BloodRequestController {

    private final BloodRequestService requestService;

    @PostMapping
    public ResponseEntity<?> createRequest(@Valid @RequestBody BloodRequestDTO dto,
                                           @AuthenticationPrincipal User user) {
        BloodRequest request = requestService.createRequest(dto, user);
        return ResponseEntity.ok(request);
    }

    @GetMapping("/mine")
    public ResponseEntity<List<BloodRequest>> getMyRequests(@AuthenticationPrincipal User user) {
        List<BloodRequest> myRequests = requestService.getMyRequests(user);
        return ResponseEntity.ok(myRequests);
    }
}