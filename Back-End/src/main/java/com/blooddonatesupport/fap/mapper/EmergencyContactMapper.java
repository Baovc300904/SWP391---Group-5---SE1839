package com.blooddonatesupport.fap.mapper;

import com.blooddonatesupport.fap.dto.EmergencyContactDTO;
import com.blooddonatesupport.fap.entity.EmergencyContact;
import org.springframework.stereotype.Component;

@Component
public class EmergencyContactMapper {

    public EmergencyContactDTO toDTO(EmergencyContact entity) {
        if (entity == null) return null;

        EmergencyContactDTO dto = new EmergencyContactDTO();
        dto.setId(entity.getId());
        dto.setFullName(entity.getFullName());
        dto.setRelationship(entity.getRelationship());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setEmail(entity.getEmail());
        dto.setCanContact(entity.getCanContact());

        if (entity.getBloodGroup() != null) {
            dto.setBloodGroupName(entity.getBloodGroup().getBloodGroupName());
        }

        return dto;
    }

    public EmergencyContact toEntity(EmergencyContactDTO dto) {
        if (dto == null) return null;

        EmergencyContact entity = new EmergencyContact();
        entity.setId(dto.getId());
        entity.setFullName(dto.getFullName());
        entity.setRelationship(dto.getRelationship());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setEmail(dto.getEmail());
        entity.setCanContact(dto.getCanContact());

        return entity;
    }
}