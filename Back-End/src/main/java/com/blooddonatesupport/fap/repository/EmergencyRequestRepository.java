package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.EmergencyRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EmergencyRequestRepository extends JpaRepository<EmergencyRequest, Long> {
    
    List<EmergencyRequest> findByUrgentTrueOrderByCreatedAtAsc();
    
    List<EmergencyRequest> findByStatus(String status);
    
    List<EmergencyRequest> findByBloodGroupIdAndStatus(Integer bloodGroupId, String status);
    
    @Query("SELECT e FROM EmergencyRequest e WHERE e.createdAt BETWEEN :start AND :end ORDER BY e.urgent DESC, e.createdAt ASC")
    List<EmergencyRequest> findByCreatedAtBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    
    @Query("SELECT COUNT(e) FROM EmergencyRequest e WHERE e.urgent = true AND e.status = 'Dang Cho'")
    long countUrgentPendingRequests();
}