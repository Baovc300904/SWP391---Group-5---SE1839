package com.blooddonatesupport.fap.dto;

import lombok.Data;

@Data
public class BloodRequestDTO {
    private String recipientName;
    private String requiredBloodGroup;
    private Integer amount;
    private String reason;
}
