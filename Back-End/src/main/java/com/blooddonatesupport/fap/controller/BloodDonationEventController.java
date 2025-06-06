package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.ErrorResponse;
import com.blooddonatesupport.fap.dto.EventRequestDTO;
import com.blooddonatesupport.fap.entity.BloodDonationEvent;
import com.blooddonatesupport.fap.service.BloodDonationEventService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class BloodDonationEventController {

    private final BloodDonationEventService eventService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createEvent(@Valid @RequestBody EventRequestDTO dto) {
        BloodDonationEvent event = eventService.createEvent(dto);
        return ResponseEntity.ok(event);
    }

    @GetMapping
    public ResponseEntity<List<BloodDonationEvent>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @Valid @RequestBody EventRequestDTO dto) {
        return eventService.updateEvent(id, dto)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404)
                        .body(new ErrorResponse(404, "Không tìm thấy sự kiện với id: " + id)));

    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        boolean deleted = eventService.deleteEvent(id);
        if (!deleted) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(404, "Không tìm thấy sự kiện với id: " + id));
        }
        return ResponseEntity.ok(new ErrorResponse(200, "Xóa sự kiện thành công"));
    }

}