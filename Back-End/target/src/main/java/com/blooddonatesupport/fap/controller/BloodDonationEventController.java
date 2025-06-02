package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.EventRequestDTO;
import com.blooddonatesupport.fap.entity.BloodDonationEvent;
import com.blooddonatesupport.fap.service.BloodDonationEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class BloodDonationEventController {

    @Autowired
    private BloodDonationEventService eventService;

    @PostMapping
    public BloodDonationEvent createEvent(@RequestBody EventRequestDTO dto) {
        return eventService.createEvent(dto);
    }

    @GetMapping
    public List<BloodDonationEvent> getAllEvents() {
        return eventService.getAllEvents();
    }

    @PutMapping("/{id}")
    public BloodDonationEvent updateEvent(@PathVariable Long id, @RequestBody EventRequestDTO dto) {
        return eventService.updateEvent(id, dto)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sự kiện có id: " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        boolean deleted = eventService.deleteEvent(id);
        if (!deleted) {
            throw new RuntimeException("Không tìm thấy sự kiện để xóa với id: " + id);
        }
    }
}
