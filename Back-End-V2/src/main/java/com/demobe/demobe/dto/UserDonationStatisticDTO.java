package com.demobe.demobe.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDonationStatisticDTO {
    private int totalDonations;
    private BigDecimal totalVolume; // Tổng đơn vị máu hiến
    private Map<String, Integer> donationByType; // Ví dụ: {"Toan Phan": 3, "Huyet Tuong": 1}
    private Map<String, Integer> donationByLocation; // {"Bệnh viện A": 2, "TT Hiến máu Q1": 2}
    private LocalDate lastDonationDate;
    private LocalDate nextEligibleDate;
}
