package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateBloodRequestDTO {
    @NotBlank()
    private String ten;

    @NotBlank()
    private String mota;
}
