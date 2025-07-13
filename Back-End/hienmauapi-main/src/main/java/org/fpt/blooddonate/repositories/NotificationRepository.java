package org.fpt.blooddonate.repositories;

import org.fpt.blooddonate.models.Blog;
import org.fpt.blooddonate.models.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    @Query("""
    SELECT b FROM Notification b
    WHERE (:status IS NULL OR b.trangThai = :status)
      AND (:keyword IS NULL OR LOWER(b.tieuDe) LIKE LOWER(CONCAT('%', :keyword, '%')))          
    """)
    Page<Notification> paginated(
            @Param("status") Integer status,
            @Param("keyword") String keyword,
            Pageable pageable
    );

    @Query("""
    SELECT b FROM Notification b
    WHERE (b.trangThai = 1)
      AND (:keyword IS NULL OR LOWER(b.tieuDe) LIKE LOWER(CONCAT('%', :keyword, '%')))
          AND (b.ngayBatDau <= :now)
              AND (b.ngayKetThuc >= :now)
    """)
    Page<Notification> getAllActive(
            @Param("keyword") String keyword,
            Pageable pageable,
            @Param("now") LocalDate now
    );
}