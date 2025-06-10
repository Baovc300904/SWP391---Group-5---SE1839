package com.demobe.demobe.repository;

import com.demobe.demobe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DonorRepository extends JpaRepository<User, Long> {

    @Query("SELECT d FROM User d WHERE d.bloodType IN :compatibleGroups AND d.healthStatus = 'Tot' AND d.accountStatus = 'Hoat_Dong'")
    List<User> findCompatibleDonors(List<com.demobe.demobe.enums.BloodType> compatibleGroups);
}


