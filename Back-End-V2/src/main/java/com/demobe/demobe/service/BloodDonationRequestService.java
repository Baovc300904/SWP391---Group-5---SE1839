package com.demobe.demobe.service;

import com.demobe.demobe.entity.BloodDonationRequest;

import java.util.List;
import java.util.Optional;

public interface BloodDonationRequestService {
    BloodDonationRequest save(BloodDonationRequest request);
    Optional<BloodDonationRequest> findById(Integer id);
    List<BloodDonationRequest> findAll();
    void deleteById(Integer id);
    void updateStatus(Integer id, BloodDonationRequest.RequestStatus status);
    List<BloodDonationRequest> findAllEligibleForRecoveryReminder();
}

