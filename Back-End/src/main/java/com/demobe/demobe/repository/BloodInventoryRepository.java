package com.demobe.demobe.repository;

import com.demobe.demobe.entity.BloodInventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BloodInventoryRepository extends JpaRepository<BloodInventory, Integer> {
    // Các truy vấn tùy chỉnh có thể thêm sau
}