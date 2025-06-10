package com.demobe.demobe.impl;

import com.demobe.demobe.entity.BloodDonationRequest;
import com.demobe.demobe.repository.BloodDonationRequestRepository;
import com.demobe.demobe.service.BloodDonationRequestService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BloodDonationRequestServiceImpl implements BloodDonationRequestService {

    private final BloodDonationRequestRepository repository;

    public BloodDonationRequestServiceImpl(BloodDonationRequestRepository repository) {
        this.repository = repository;
    }

    @Override
    public BloodDonationRequest save(BloodDonationRequest request) {
        if (request.getExpectedDonationDate() != null && request.getDonationType() != null) {
            request.setExpectedRecoveryDate(
                    calculateRecoveryDate(request.getExpectedDonationDate(), request.getDonationType())
            );
        }
        return repository.save(request);
    }

    private LocalDate calculateRecoveryDate(LocalDate donationDate, BloodDonationRequest.DonationType type) {
        return switch (type) {
            case Toan_Phan -> donationDate.plusWeeks(8);
            case Hong_Cau -> donationDate.plusWeeks(12);
            case Huyet_Tuong -> donationDate.plusWeeks(2);
            case Tieu_Cau -> donationDate.plusWeeks(4);
        };
    }
    @Override
    public List<BloodDonationRequest> findAllEligibleForRecoveryReminder() {
        LocalDate today = LocalDate.now();
        return repository.findAll().stream()
                .filter(r -> r.getExpectedRecoveryDate() != null)
                .filter(r -> r.getStatus() == BloodDonationRequest.RequestStatus.Da_Hien)
                .filter(r -> today.isEqual(r.getExpectedRecoveryDate()))
                .toList();
    }



    @Override
    public Optional<BloodDonationRequest> findById(Integer id) {
        return repository.findById(id);
    }


    @Override
    public List<BloodDonationRequest> findAll() {
        return repository.findAll();
    }

    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}

