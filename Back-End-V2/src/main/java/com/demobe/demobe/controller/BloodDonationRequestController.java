package com.demobe.demobe.controller;


import com.demobe.demobe.entity.BloodDonationRequest;
import com.demobe.demobe.entity.BloodDonationRequest.RequestStatus;
import com.demobe.demobe.service.BloodDonationRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class BloodDonationRequestController {

    private final BloodDonationRequestService service;

    public BloodDonationRequestController(BloodDonationRequestService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<BloodDonationRequest> create(@RequestBody BloodDonationRequest request) {
        return ResponseEntity.ok(service.save(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BloodDonationRequest> getById(@PathVariable Integer id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<BloodDonationRequest>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable Integer id, @RequestParam RequestStatus status) {
        service.updateStatus(id, status);
        return ResponseEntity.noContent().build();
    }

}
