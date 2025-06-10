package com.demobe.demobe.service;

import com.demobe.demobe.entity.BloodDonationRequest;

import java.util.List;
import java.util.Optional;

public interface BloodDonationRequestService {
    BloodDonationRequest save(BloodDonationRequest request);
    Optional<BloodDonationRequest> findById(Integer id);
    List<BloodDonationRequest> findAll();
    void deleteById(Integer id);

    // Thêm cho chức năng nhắc nhở hồi phục
    List<BloodDonationRequest> findAllEligibleForRecoveryReminder();
}

