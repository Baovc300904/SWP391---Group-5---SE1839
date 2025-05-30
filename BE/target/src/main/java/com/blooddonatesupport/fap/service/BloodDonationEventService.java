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
        event.setTenSuKien(dto.getTenSuKien());
        event.setNgayToChuc(dto.getNgayToChuc());
        event.setDiaDiem(dto.getDiaDiem());
        event.setMoTa(dto.getMoTa());
        event.setSoLuongNguoiDuKien(dto.getSoLuongNguoiDuKien());
        return eventRepo.save(event);
    }

    public List<BloodDonationEvent> getAllEvents() {
        return eventRepo.findAll();
    }

    public Optional<BloodDonationEvent> updateEvent(Long id, EventRequestDTO dto) {
        return eventRepo.findById(id).map(event -> {
            event.setTenSuKien(dto.getTenSuKien());
            event.setNgayToChuc(dto.getNgayToChuc());
            event.setDiaDiem(dto.getDiaDiem());
            event.setMoTa(dto.getMoTa());
            event.setSoLuongNguoiDuKien(dto.getSoLuongNguoiDuKien());
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

