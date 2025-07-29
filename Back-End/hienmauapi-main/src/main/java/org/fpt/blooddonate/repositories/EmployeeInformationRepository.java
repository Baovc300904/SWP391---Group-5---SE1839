package org.fpt.blooddonate.repositories;

import org.fpt.blooddonate.models.EmployeeInformation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeInformationRepository extends JpaRepository<EmployeeInformation, Integer> {
    Optional<EmployeeInformation> findByMaSoNhanVien(String maSoNhanVien);
}