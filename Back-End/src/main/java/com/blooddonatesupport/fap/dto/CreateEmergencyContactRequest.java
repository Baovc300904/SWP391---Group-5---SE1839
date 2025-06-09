package com.blooddonatesupport.fap.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateEmergencyContactRequest {
    @NotBlank(message = "Full name is required")
    private String fullName;

    private String relationship;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @Email(message = "Invalid email format")
    private String email;

    private Boolean canContact = true;

    private Long bloodGroupId;
}