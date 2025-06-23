package org.fpt.blooddonate.repositories;

import org.fpt.blooddonate.models.BloodDonationActivity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BloodDonationActivityRespository extends JpaRepository<BloodDonationActivity, Integer> {
    @Query("""
    SELECT b FROM BloodDonationActivity b
    WHERE (:keyword IS NULL OR LOWER(b.ten) LIKE LOWER(CONCAT('%', :keyword, '%')))
          AND (:status IS NULL OR b.trangThaiHoatDong = :status)
    """)
    Page<BloodDonationActivity> paginated(
            @Param("status") String status,
            @Param("keyword") String keyword,
            Pageable pageable
    );
}