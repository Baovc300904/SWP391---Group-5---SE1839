package com.demobe.demobe.repository;

import com.demobe.demobe.entity.DonationHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DonationHistoryRepository extends JpaRepository<DonationHistory, Integer> {
    @Query("SELECT d FROM DonationHistory d WHERE d.nguoiDung.id = :userId ORDER BY d.ngayHienThucTe DESC")
    List<DonationHistory> findRecentByUserId(@Param("userId") Integer userId);
}

