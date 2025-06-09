package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.SupportRequest;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.entity.SupportRequest.SupportStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SupportRequestRepository extends JpaRepository<SupportRequest, Long> {

    List<SupportRequest> findBySender(User sender);

    List<SupportRequest> findByStatus(SupportStatus status);

    List<SupportRequest> findByHandler(User handler);

    @Query("SELECT sr FROM SupportRequest sr WHERE sr.status = com.blooddonatesupport.fap.entity.SupportRequest.SupportStatus.Moi OR sr.status = com.blooddonatesupport.fap.entity.SupportRequest.SupportStatus.Dang_Xu_Ly")
    List<SupportRequest> findPendingRequests();

    @Query("SELECT sr FROM SupportRequest sr WHERE sr.createdAt BETWEEN :startDate AND :endDate")
    List<SupportRequest> findByDateRange(@Param("startDate") LocalDateTime startDate,
                                         @Param("endDate") LocalDateTime endDate);

    @Query("SELECT COUNT(sr) FROM SupportRequest sr WHERE sr.handler IS NULL AND sr.status = com.blooddonatesupport.fap.entity.SupportRequest.SupportStatus.Moi")
    long countUnhandledRequests();
}
