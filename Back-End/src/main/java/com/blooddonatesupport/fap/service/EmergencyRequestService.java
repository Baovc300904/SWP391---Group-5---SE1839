package com.blooddonatesupport.fap.service;

import com.blooddonatesupport.fap.dto.EmergencyRequestDTO;
import com.blooddonatesupport.fap.entity.EmergencyRequest;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.repository.EmergencyRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmergencyRequestService {

    private final EmergencyRequestRepository repository;

    public EmergencyRequest createEmergency(EmergencyRequestDTO dto, User nguoiTao) {
        EmergencyRequest request = new EmergencyRequest();
        request.setBloodGroupId(dto.getBloodGroupId());
        request.setBloodComponent(dto.getBloodComponent());
        request.setQuantity(dto.getQuantity());
        request.setUrgent(dto.isUrgent());
        request.setLocation(dto.getLocation());
        request.setDescription(dto.getDescription());
        request.setCreator(nguoiTao);
        request.setCreatedAt(LocalDateTime.now());
        request.setStatus("Dang Cho");

        return repository.save(request);
    }

    public List<EmergencyRequest> getAll() {
        return repository.findAll();
    }
}
