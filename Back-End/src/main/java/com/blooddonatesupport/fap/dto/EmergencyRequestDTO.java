package com.blooddonatesupport.fap.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyRequestDTO {
    private String bloodGroup;
    private String location;
    private String description;
}
