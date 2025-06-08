package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {

    List<Inventory> findByBloodGroupId(Integer bloodGroupId);

    List<Inventory> findByStatus(Inventory.BloodStatus status);

    List<Inventory> findByBloodGroupIdAndStatus(Integer bloodGroupId, Inventory.BloodStatus status);

    List<Inventory> findByExpiredDateBeforeAndStatus(LocalDate date, Inventory.BloodStatus status);

    List<Inventory> findByBloodComponentAndStatus(Inventory.BloodComponent component, Inventory.BloodStatus status);

    @Query("SELECT i FROM Inventory i WHERE i.bloodGroupId = :bloodGroupId AND i.status = 'San_Sang' AND i.expiredDate > CURRENT_DATE ORDER BY i.expiredDate ASC")
    List<Inventory> findAvailableByBloodGroup(@Param("bloodGroupId") Integer bloodGroupId);

    @Query("SELECT SUM(i.quantity) FROM Inventory i WHERE i.bloodGroupId = :bloodGroupId AND i.status = 'San_Sang' AND i.expiredDate > CURRENT_DATE")
    Optional<java.math.BigDecimal> getTotalAvailableQuantity(@Param("bloodGroupId") Integer bloodGroupId);
}

