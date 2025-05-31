package com.blooddonatesupport.fap.service;

import com.blooddonatesupport.fap.dto.EmergencyRequestDTO;
import com.blooddonatesupport.fap.entity.EmergencyRequest;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.repository.EmergencyRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmergencyRequestService {

    private final EmergencyRequestRepository repository;

    public void createEmergency(EmergencyRequestDTO dto, User nguoiTao) {
        EmergencyRequest request = new EmergencyRequest();
        request.setNhomMau(dto.getNhomMau());
        request.setDiaDiem(dto.getDiaDiem());
        request.setMoTa(dto.getMoTa());
        request.setNguoiTao(nguoiTao);
        repository.save(request);
    }

    public List<EmergencyRequest> getAll() {
        return repository.findAll();
    }
}