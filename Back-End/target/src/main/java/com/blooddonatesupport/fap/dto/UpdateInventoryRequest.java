package com.blooddonatesupport.fap.dto;

import lombok.Data;

@Data
public class UpdateInventoryRequest {
    private String nhomMau;
    private int thayDoi; // Có thể âm (-) khi nhận máu, dương (+) khi hiến
}