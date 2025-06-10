package com.demobe.demobe.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class RequestResponse {
    private Integer id;
    private String donationType;
    private LocalDate expectedDonationDate;
    private String status;
    private LocalDateTime registrationDate;
    private String note;
    private Integer requesterId;
}
