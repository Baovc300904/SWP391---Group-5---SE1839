package com.blooddonatesupport.fap.service;

import com.blooddonatesupport.fap.dto.EventRequestDTO;
import com.blooddonatesupport.fap.entity.BloodDonationEvent;
import com.blooddonatesupport.fap.repository.BloodDonationEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BloodDonationEventService {

    @Autowired
    private BloodDonationEventRepository eventRepo;

    public BloodDonationEvent createEvent(EventRequestDTO dto) {
        BloodDonationEvent event = new BloodDonationEvent();
        event.setEventName(dto.getEventName());
        event.setStartDate(dto.getStartDate());
        event.setEndDate(dto.getEndDate());
        event.setLocation(dto.getLocation());
        event.setDescription(dto.getDescription());
        event.setMaxParticipants(dto.getMaxParticipants());
        event.setStatus(dto.getStatus());
        // event.setCreator(user); nếu bạn dùng @AuthenticationPrincipal User user
        return eventRepo.save(event);
    }

    public List<BloodDonationEvent> getAllEvents() {
        return eventRepo.findAll();
    }

    public Optional<BloodDonationEvent> updateEvent(Long id, EventRequestDTO dto) {
        return eventRepo.findById(id).map(event -> {
            event.setEventName(dto.getEventName());
            event.setStartDate(dto.getStartDate()); // ✅ sửa đúng field
            event.setEndDate(dto.getEndDate());     // ✅ nếu DTO có
            event.setLocation(dto.getLocation());
            event.setDescription(dto.getDescription());
            event.setMaxParticipants(dto.getMaxParticipants()); // ✅ sửa đúng field
            event.setStatus(dto.getStatus()); // nếu có
            return eventRepo.save(event);
        });
    }

    public boolean deleteEvent(Long id) {
        if (eventRepo.existsById(id)) {
            eventRepo.deleteById(id);
            return true;
        }
        return false;
    }
}

