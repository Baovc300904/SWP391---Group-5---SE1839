package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.EmergencyRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmergencyRequestRepository extends JpaRepository<EmergencyRequest, Long> {
}
