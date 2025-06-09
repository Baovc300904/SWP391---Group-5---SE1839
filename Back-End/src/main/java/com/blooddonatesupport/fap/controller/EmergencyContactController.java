package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.EmergencyContactDTO;
import com.blooddonatesupport.fap.entity.EmergencyContact;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.mapper.EmergencyContactMapper;
import com.blooddonatesupport.fap.service.EmergencyContactService;
import com.blooddonatesupport.fap.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/emergency-contacts")
@RequiredArgsConstructor
public class EmergencyContactController {

    private final EmergencyContactService emergencyContactService;
    private final UserService userService;
    private final EmergencyContactMapper emergencyContactMapper; // ← Thêm dòng này

    /**
     * Get all emergency contacts for current user (trả về DTO)
     */
    @GetMapping
    public ResponseEntity<List<EmergencyContactDTO>> getUserEmergencyContacts(Authentication authentication) {
        User currentUser = userService.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<EmergencyContact> contacts = emergencyContactService.findByUser(currentUser);
        List<EmergencyContactDTO> contactDTOs = contacts.stream()
                .map(emergencyContactMapper::toDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(contactDTOs);
    }

    /**
     * Create new emergency contact
     */
    @PostMapping
    public ResponseEntity<EmergencyContact> createEmergencyContact(
            @RequestBody EmergencyContact emergencyContact,
            Authentication authentication) {

        User currentUser = userService.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        emergencyContact.setUser(currentUser);
        EmergencyContact savedContact = emergencyContactService.save(emergencyContact);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedContact);
    }

    /**
     * Update emergency contact
     */
    @PutMapping("/{id}")
    public ResponseEntity<EmergencyContact> updateEmergencyContact(
            @PathVariable Long id,
            @RequestBody EmergencyContact emergencyContact,
            Authentication authentication) {

        User currentUser = userService.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return emergencyContactService.findById(id)
                .filter(contact -> contact.getUser().getUserId().equals(currentUser.getUserId()))
                .map(existingContact -> {
                    emergencyContact.setId(id);
                    emergencyContact.setUser(currentUser);
                    return ResponseEntity.ok(emergencyContactService.update(emergencyContact));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Delete emergency contact
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmergencyContact(@PathVariable Long id, Authentication authentication) {
        User currentUser = userService.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return emergencyContactService.findById(id)
                .filter(contact -> contact.getUser().getUserId().equals(currentUser.getUserId()))
                .map(contact -> {
                    emergencyContactService.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get contactable emergency contacts (trả về Entity)
     */
    @GetMapping("/contactable")
    public ResponseEntity<List<EmergencyContact>> getContactableEmergencyContacts(Authentication authentication) {
        User currentUser = userService.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<EmergencyContact> contacts = emergencyContactService.findContactableByUser(currentUser);
        return ResponseEntity.ok(contacts);
    }
}