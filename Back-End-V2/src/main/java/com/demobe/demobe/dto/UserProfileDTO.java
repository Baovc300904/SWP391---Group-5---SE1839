package com.demobe.demobe.dto;


import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO {
    private Integer id;
    private String fullName;
    private String username;
    private String email;
    private String phoneNumber;
    private LocalDate birthDate;
    private String gender;
    private String address;
    private String bloodGroup;
    private String rhFactor;
    private String medicalHistory;
    private BigDecimal weight;
    private BigDecimal height;
    private String role;
    private LocalDate registrationDate;
    private String accountStatus;
}

