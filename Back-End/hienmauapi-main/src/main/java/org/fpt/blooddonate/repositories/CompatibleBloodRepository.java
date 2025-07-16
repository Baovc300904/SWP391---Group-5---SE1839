package org.fpt.blooddonate.repositories;

import org.fpt.blooddonate.models.CompatibleBlood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;


public interface CompatibleBloodRepository extends JpaRepository<CompatibleBlood, Integer> {
    @Query("SELECT h FROM CompatibleBlood h WHERE h.nhomMauHien.id = :bloodId")
    List<CompatibleBlood> findAllByNhomMauHien(@Param("bloodId") Integer bloodId);

    @Query("SELECT h FROM CompatibleBlood h WHERE h.nhomMauNhan.id = :bloodId")
    List<CompatibleBlood> findAllByNhomMauNhan(@Param("bloodId") Integer bloodId);
}