package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.DonationHistory;
import com.blooddonatesupport.fap.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationHistoryRepository extends JpaRepository<DonationHistory, Long> {
    List<DonationHistory> findByUser(User user);
}
