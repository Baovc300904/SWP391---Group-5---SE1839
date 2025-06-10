package com.demobe.demobe.repository;


import com.demobe.demobe.entity.BloodDonationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BloodDonationRequestRepository extends JpaRepository<BloodDonationRequest, Integer> {

}