package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.BloodGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BloodGroupRepository extends JpaRepository<BloodGroup, Integer> {

    Optional<BloodGroup> findByBloodGroupName(String bloodGroupName);

    @Query("SELECT bg FROM BloodGroup bg WHERE bg.compatibleRecipients LIKE %:bloodType%")
    List<BloodGroup> findCompatibleDonors(String bloodType);

    @Query("SELECT bg FROM BloodGroup bg WHERE bg.compatibleDonors LIKE %:bloodType%")
    List<BloodGroup> findCompatibleRecipients(String bloodType);
}
