package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateEmployeeRequestDTO {
    @NotBlank
    private String ten;

    @NotBlank
    private String tendangnhap;

    @NotBlank
    private String matkhau;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String sodienthoai;

    @NotBlank
    private String ngaysinh;

    @NotBlank
    private String gioitinh;

    @NotBlank
    private String diachi;

    @NotBlank()
    private String maSoNhanVien;

    @NotBlank()
    private String chucVu;

    @NotBlank()
    private String phongBan;

    @NotBlank()
    private String ngayVaoLam;

    @NotBlank()
    private String trangThaiLamViec;
}
