package com.demobe.demobe.dto;

import com.demobe.demobe.enums.BloodComponent;
import com.demobe.demobe.enums.UrgencyLevel;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BloodDonationRequest {
    private String bloodType;
    private BloodComponent component;
    private LocalDate readyDate;
    private UrgencyLevel urgencyLevel = UrgencyLevel.NORMAL; // Thêm dòng này

}
