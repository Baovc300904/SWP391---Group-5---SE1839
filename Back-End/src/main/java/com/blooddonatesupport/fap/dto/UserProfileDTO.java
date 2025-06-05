package com.blooddonatesupport.fap.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class UserProfileDTO {
    private String fullName;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private Integer bloodType;
    private String rhFactor;
    private String medicalHistory;
    private BigDecimal weight;
    private BigDecimal height;
    private String currentHealthStatus;
}

