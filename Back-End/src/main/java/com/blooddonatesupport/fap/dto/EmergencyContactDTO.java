package com.blooddonatesupport.fap.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyContactDTO {
    private Long id;
    private String fullName;
    private String relationship;
    private String phoneNumber;
    private String email;
    private Boolean canContact;
    private String bloodGroupName; // Thay vì trả về toàn bộ object
}