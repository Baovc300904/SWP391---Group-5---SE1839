package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.BloodRequest;
import com.blooddonatesupport.fap.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {
    List<BloodRequest> findByNguoiGui(User user);
}
