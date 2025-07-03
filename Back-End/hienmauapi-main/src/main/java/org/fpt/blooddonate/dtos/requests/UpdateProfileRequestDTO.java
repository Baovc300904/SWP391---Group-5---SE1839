package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.*;
        import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class UpdateProfileRequestDTO {

    @NotBlank
    private String ten;

    @NotBlank
    private String sodienthoai;

    @NotBlank
    private String ngaysinh;

    @NotBlank
    private String gioitinh;

    @NotBlank
    private String diachi;

    @NotNull
    private Integer nhommau;

    @NotBlank
    private String yeutorh;

    @NotBlank
    private String tiensubenh;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal cannang;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal chieucao;
}
