package org.fpt.blooddonate.repositories;

import org.fpt.blooddonate.models.BloodDonationRequest;
import org.fpt.blooddonate.models.BloodReceiveRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BloodReceiveRequestRepository extends JpaRepository<BloodReceiveRequest, Integer> {
    @Query("""
    SELECT b FROM BloodReceiveRequest b
    WHERE (:keyword IS NULL OR LOWER(b.lyDo) LIKE LOWER(CONCAT('%', :keyword, '%')))
          AND (:status IS NULL OR b.trangThai = :status)
    """)
    Page<BloodReceiveRequest> paginated(
            @Param("status") String status,
            @Param("keyword") String keyword,
            Pageable pageable
    );

    @Query("""
    SELECT b FROM BloodReceiveRequest b
    WHERE (:keyword IS NULL OR LOWER(b.lyDo) LIKE LOWER(CONCAT('%', :keyword, '%')))
          AND (:status IS NULL OR b.trangThai = :status)
              AND (:userId IS NULL OR b.nguoiNhan.id = :userId)
    """)
    Page<BloodReceiveRequest> paginatedByUserId(
            Integer userId,
            @Param("status") String status,
            @Param("keyword") String keyword,
            Pageable pageable
    );
}
