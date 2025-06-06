package com.blooddonatesupport.fap.dto;

import lombok.Data;

@Data
public class UpdateInventoryRequest {
    private Integer bloodGroup;
    private int changeAmount; // Can be negative when receiving blood, positive when donating
}
