package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChangePasswordRequestDTO {
    @NotBlank()
    private String matkhaucu;

    @NotBlank()
    private String matkhaumoi;
}
