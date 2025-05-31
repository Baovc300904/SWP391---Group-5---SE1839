package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.BloodRequestDTO;
import com.blooddonatesupport.fap.entity.BloodRequest;
import com.blooddonatesupport.fap.service.BloodRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/request")
@RequiredArgsConstructor
public class BloodRequestController {

    private final BloodRequestService requestService;

    // POST /api/request
    @PostMapping
    public ResponseEntity<?> createRequest(@RequestBody BloodRequestDTO dto) {
        requestService.createRequest(dto);
        return ResponseEntity.ok("Yêu cầu nhận máu đã được gửi.");
    }

    // GET /api/request/mine
    @GetMapping("/mine")
    public ResponseEntity<List<BloodRequest>> getMyRequests() {
        List<BloodRequest> myRequests = requestService.getMyRequests();
        return ResponseEntity.ok(myRequests);
    }
}
