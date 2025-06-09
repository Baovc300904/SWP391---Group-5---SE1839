package com.blooddonatesupport.fap.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventRequestDTO {
    private String eventName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String location;
    private String description;
    private Integer maxParticipants;
    private String status;
}


