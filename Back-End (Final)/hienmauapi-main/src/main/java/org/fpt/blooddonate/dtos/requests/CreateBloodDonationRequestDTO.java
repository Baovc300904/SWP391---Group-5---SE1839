package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateBloodDonationRequestDTO {
    private Integer hoatDongHienMau;

    @NotBlank()
    private String ngayHienMauDuKien;

    @NotBlank()
    private String ngayPhucHoiGanNhat;

    private String ghiChu;

    @NotBlank()
    @Pattern(regexp = "toanphan|hongcau|tieucau|huyettuong")
    private String loaiHien;
}
