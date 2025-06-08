package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.EmergencyContact;
import com.blooddonatesupport.fap.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmergencyContactRepository extends JpaRepository<EmergencyContact, Long> {

    /**
     * Find all emergency contacts for a specific user
     */
    List<EmergencyContact> findByUser(User user);

    /**
     * Find emergency contacts by user ID
     */
    List<EmergencyContact> findByUserUserId(Integer userId);

    /**
     * Find emergency contacts that can be contacted
     */
    List<EmergencyContact> findByUserAndCanContactTrue(User user);

    /**
     * Find emergency contacts by relationship
     */
    List<EmergencyContact> findByUserAndRelationship(User user, String relationship);

    /**
     * Count emergency contacts for a user
     */
    long countByUser(User user);
}