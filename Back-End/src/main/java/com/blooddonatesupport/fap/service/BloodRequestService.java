package com.blooddonatesupport.fap.service;

import com.blooddonatesupport.fap.dto.BloodRequestDTO;
import com.blooddonatesupport.fap.entity.BloodRequest;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.repository.BloodRequestRepository;
import com.blooddonatesupport.fap.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BloodRequestService {

    private final BloodRequestRepository requestRepository;
    private final UserRepository userRepository;

    public BloodRequest createRequest(BloodRequestDTO dto, User user) {
        BloodRequest request = new BloodRequest();
        request.setRecipient(dto.getRecipientName());
        request.setRequestedBloodGroup(dto.getRequiredBloodGroup());
        request.setQuantity(dto.getAmount());
        request.setReason(dto.getReason());
        request.setCreatedAt(LocalDateTime.now());
        request.setSender(user);

        return requestRepository.save(request);
    }

    public List<BloodRequest> getMyRequests(User user) {
        return requestRepository.findBySender(user);
    }
}