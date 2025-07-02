package org.fpt.blooddonate.controllers;

import jakarta.validation.Valid;
import org.fpt.blooddonate.dtos.requests.ChangeStatusBloodReceiveRequestToAvailable;
import org.fpt.blooddonate.dtos.requests.ChangeStatusDonationRequestDTO;
import org.fpt.blooddonate.dtos.requests.CompleteDonationRequestDTO;
import org.fpt.blooddonate.dtos.requests.UpdateReceiveDonationRequestDTO;
import org.fpt.blooddonate.models.BloodDonationRequest;
import org.fpt.blooddonate.models.BloodReceiveRequest;
import org.fpt.blooddonate.services.BloodReceiveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/blood-receive-requests")
public class AdminBloodReceiveRequestController {
    @Autowired
    private BloodReceiveRequestService bloodReceiveRequestService;

    @GetMapping
    public ResponseEntity<Page<BloodReceiveRequest>> getAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String keyword
    ) {
        return ResponseEntity.ok(bloodReceiveRequestService.getAll(page, status, keyword));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        Optional<BloodReceiveRequest> result = bloodReceiveRequestService.getById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.status(404).body("Not found request");
        }
    }

    @PostMapping("/{id}/available")
    public ResponseEntity<?> available(@PathVariable Integer id, @Valid @RequestBody ChangeStatusBloodReceiveRequestToAvailable payload) throws IOException {
        return bloodReceiveRequestService.available(id, payload)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body("Not found activity"));
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<?> reject(@PathVariable Integer id, @Valid @RequestBody ChangeStatusDonationRequestDTO payload) throws IOException {
        return bloodReceiveRequestService.reject(id, payload)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body("Not found activity"));
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<?> complete(@PathVariable Integer id) throws IOException {
        return bloodReceiveRequestService.complete(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body("Not found activity"));
    }
}
