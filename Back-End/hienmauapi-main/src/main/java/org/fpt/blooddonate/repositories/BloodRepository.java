package org.fpt.blooddonate.repositories;

import org.fpt.blooddonate.models.Blood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloodRepository extends JpaRepository<Blood, Integer> {
    boolean existsByTen(String ten);
}