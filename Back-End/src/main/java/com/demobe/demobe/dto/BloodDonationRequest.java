package com.demobe.demobe.dto;

import com.demobe.demobe.enums.BloodComponent;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BloodDonationRequest {
    private Integer requesterId;
    private LocalDate expectedDonationDate;
    private String donationType;
    private String status;
    private String note;
}
