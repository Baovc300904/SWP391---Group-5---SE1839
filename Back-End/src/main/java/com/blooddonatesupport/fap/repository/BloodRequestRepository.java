package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.BloodRequest;
import com.blooddonatesupport.fap.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {
    List<BloodRequest> findBySender(User sender);
}