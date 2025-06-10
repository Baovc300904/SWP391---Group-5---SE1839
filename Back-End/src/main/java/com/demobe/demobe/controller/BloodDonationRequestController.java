package com.demobe.demobe.controller;

import com.demobe.demobe.dto.RequestResponse;
import com.demobe.demobe.entity.BloodDonationRequest;
import com.demobe.demobe.entity.User;
import com.demobe.demobe.enums.UrgencyLevel;
import com.demobe.demobe.repository.UserRepository;
import com.demobe.demobe.service.BloodDonationRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class BloodDonationRequestController {

    private final BloodDonationRequestService service;
    private final UserRepository userRepository;

    public BloodDonationRequestController(BloodDonationRequestService service, UserRepository userRepository) {
        this.service = service;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody RequestResponse dto) {
        if (dto.getRequesterId() == null) {
            return ResponseEntity.badRequest().body("Requester ID is required");
        }

        User requester = userRepository.findById(Long.valueOf(dto.getRequesterId()))
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        BloodDonationRequest request = BloodDonationRequest.builder()
                .expectedDonationDate(dto.getExpectedDonationDate())
                .donationType(BloodDonationRequest.DonationType.valueOf(dto.getDonationType()))
                .status(BloodDonationRequest.RequestStatus.valueOf(dto.getStatus()))
                .note(dto.getNote())
                .requester(requester)
                .build();

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

//    @PostMapping("/urgent")
//    public ResponseEntity<BloodDonationRequest> createUrgentRequest(@RequestBody BloodDonationRequest dto) {
//        dto.setUrgencyLevel(UrgencyLevel.URGENT);
//        return ResponseEntity.ok(service.save(dto));
//    }
}
