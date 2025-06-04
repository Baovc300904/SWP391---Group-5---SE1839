package com.blooddonatesupport.fap.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationRegistrationRequest {
    private LocalDate donationDate;
    private String location;
    private String bloodGroup;
}

