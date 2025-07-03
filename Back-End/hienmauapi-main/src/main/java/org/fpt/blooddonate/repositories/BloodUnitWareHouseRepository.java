package org.fpt.blooddonate.repositories;

import org.fpt.blooddonate.models.BloodDonationRequest;
import org.fpt.blooddonate.models.BloodUnitWareHouse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BloodUnitWareHouseRepository extends JpaRepository<BloodUnitWareHouse, Integer> {
    @Query("""
    SELECT b FROM BloodUnitWareHouse b
    WHERE (:keyword IS NULL OR LOWER(b.viTriLuuTru) LIKE LOWER(CONCAT('%', :keyword, '%')))
          AND (:status IS NULL OR b.trangThai = :status)
    """)
    Page<BloodUnitWareHouse> paginated(
            @Param("status") String status,
            @Param("keyword") String keyword,
            Pageable pageable
    );
}