package com.demobe.demobe.dto;

import com.demobe.demobe.enums.BloodComponent;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BloodDonationRequest {
    private String bloodType;
    private BloodComponent component;
    private LocalDate readyDate;
}
