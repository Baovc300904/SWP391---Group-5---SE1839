package com.blooddonatesupport.fap.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class UserProfileDTO {
    private String hoVaTen;
    private String soDienThoai;
    private LocalDate ngaySinh;
    private String gioiTinh;
    private String diaChi;
    private Integer maNhomMau;
    private String yeuToRh;
    private String tienSuBenh;
    private BigDecimal canNang;
    private BigDecimal chieuCao;
    private String tinhTrangSucKhoeHienTai;
}
