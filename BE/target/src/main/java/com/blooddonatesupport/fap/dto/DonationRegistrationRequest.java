package com.blooddonatesupport.fap.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationRegistrationRequest {
    private LocalDate ngayHien;
    private String diaDiem;
    private String nhomMau;
}
