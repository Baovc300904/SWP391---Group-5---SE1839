package org.fpt.blooddonate.dtos.requests;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginRequestDTO {
    @NotBlank()
    private String tendangnhap;

    @NotBlank()
    private String matkhau;
}
