package org.fpt.blooddonate.controllers;

import jakarta.validation.Valid;
import org.fpt.blooddonate.dtos.requests.*;
import org.fpt.blooddonate.models.BloodDonationRequest;
import org.fpt.blooddonate.services.BloodDonationRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/blood-donation-requests")
public class BloodDonationRequestController {
    @Autowired
    private BloodDonationRequestService bloodDonationRequestService;

    @GetMapping
    public ResponseEntity<Page<BloodDonationRequest>> getAll(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(required = false) String status,
        @RequestParam(required = false) String keyword
    ) {
        return ResponseEntity.ok(bloodDonationRequestService.getAll(page, status, keyword));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        Optional<BloodDonationRequest> result = bloodDonationRequestService.getById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.status(404).body("Not found request");
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CreateBloodDonationRequestDTO payload) throws IOException {
        return ResponseEntity.ok(bloodDonationRequestService.create(payload));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @Valid @RequestBody UpdateBloodDonationRequestDTO payload) throws IOException {
        return bloodDonationRequestService.update(id, payload)
            .<ResponseEntity<?>>map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(404).body("Not found activity"));
    }

    @PostMapping("/{id}/change-status")
    public ResponseEntity<?> updateStatus(@PathVariable Integer id, @Valid @RequestBody ChangeStatusDonationRequestDTO payload) throws IOException {
        return bloodDonationRequestService.changeStatus(id, payload)
            .<ResponseEntity<?>>map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(404).body("Not found activity"));
    }
}
