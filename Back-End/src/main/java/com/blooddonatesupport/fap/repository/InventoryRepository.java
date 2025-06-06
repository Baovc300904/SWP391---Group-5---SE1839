package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByBloodGroupId(Integer bloodGroupId);
}

