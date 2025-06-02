package com.blooddonatesupport.fap.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventRequestDTO {
    private String tenSuKien;
    private LocalDate ngayToChuc;
    private String diaDiem;
    private String moTa;
    private Integer soLuongNguoiDuKien;
}

