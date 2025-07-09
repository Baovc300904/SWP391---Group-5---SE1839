package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateReceiveDonationRequestDTO {
    @NotBlank()
    private String ngayNhanMauDuKien;

    @NotNull()
    private Integer nhomMau;

    @NotBlank()
    private String thanhPhanMauCan;

    @NotNull
    private Integer soLuongDonVi;

    private String lyDo;

    @NotBlank()
    private String diaChiNhanMau;

    @NotNull
    private Integer khanCap = 1;

    @NotBlank()
    private String sucKhoeHienTai;

    @NotNull
    private int dangMangThai;

    @NotNull
    private int macBenhTruyenNhiem;
}
