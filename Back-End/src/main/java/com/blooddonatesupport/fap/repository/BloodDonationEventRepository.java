package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.BloodDonationEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BloodDonationEventRepository extends JpaRepository<BloodDonationEvent, Long> {
}
