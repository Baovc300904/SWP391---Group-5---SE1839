package org.fpt.blooddonate.repositories;

import org.fpt.blooddonate.models.Blood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodRepository extends JpaRepository<Blood, Integer> {
    boolean existsByTen(String ten);

    List<Blood> findAllByTrangThai(Integer trangThai);
}