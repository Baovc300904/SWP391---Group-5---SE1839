package com.demobe.demobe.repository;

import com.demobe.demobe.entity.BloodDonationReceiver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BloodDonationReceiverRepository extends JpaRepository<BloodDonationReceiver, Integer> {
    // Các truy vấn tùy chỉnh có thể thêm sau
}