package com.demobe.demobe.repository;


import com.demobe.demobe.entity.BloodDonationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BloodDonationRequestRepository extends JpaRepository<BloodDonationRequest, Integer> {
    @Query("SELECT b FROM BloodDonationRequest b WHERE b.expectedRecoveryDate = :today AND b.status = 'Da_Hien'")
    List<BloodDonationRequest> findAllEligibleForRecoveryReminder(@Param("today") LocalDate today);

}