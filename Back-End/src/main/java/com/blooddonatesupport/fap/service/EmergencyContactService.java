package com.blooddonatesupport.fap.service;

import com.blooddonatesupport.fap.entity.EmergencyContact;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.repository.EmergencyContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class EmergencyContactService {

    private final EmergencyContactRepository emergencyContactRepository;

    /**
     * Save emergency contact
     */
    public EmergencyContact save(EmergencyContact emergencyContact) {
        return emergencyContactRepository.save(emergencyContact);
    }

    /**
     * Find emergency contact by ID
     */
    @Transactional(readOnly = true)
    public Optional<EmergencyContact> findById(Long id) {
        return emergencyContactRepository.findById(id);
    }

    /**
     * Find all emergency contacts for a user
     */
    @Transactional(readOnly = true)
    public List<EmergencyContact> findByUser(User user) {
        return emergencyContactRepository.findByUser(user);
    }

    /**
     * Find contactable emergency contacts for a user
     */
    @Transactional(readOnly = true)
    public List<EmergencyContact> findContactableByUser(User user) {
        return emergencyContactRepository.findByUserAndCanContactTrue(user);
    }

    /**
     * Delete emergency contact
     */
    public void deleteById(Long id) {
        emergencyContactRepository.deleteById(id);
    }

    /**
     * Update emergency contact
     */
    public EmergencyContact update(EmergencyContact emergencyContact) {
        return emergencyContactRepository.save(emergencyContact);
    }

    /**
     * Get emergency contacts count for user
     */
    @Transactional(readOnly = true)
    public long getContactCountForUser(User user) {
        return emergencyContactRepository.countByUser(user);
    }
}
