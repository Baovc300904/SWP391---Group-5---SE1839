package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateBloodRequestDTO {
    @NotBlank()
    private String ten;

    @NotBlank()
    private String mota;
}
