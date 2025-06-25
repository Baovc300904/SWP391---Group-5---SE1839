package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateBloodDonationRequestDTO {
    @NotBlank()
    private String ngayHienMauDuKien;

    @NotBlank()
    private String ngayPhucHoiGanNhat;

    private String ghiChu;

    @NotNull()
    private int soLuong;

    @NotBlank()
    @Pattern(regexp = "toanphan|hongcau|tieucau|huyettuong")
    private String loaiHien;
}
