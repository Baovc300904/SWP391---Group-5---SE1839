package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TestedBloodUnitWareHouseRequestDTO {
    @NotBlank()
    private String ketQuaXetNghiem;

    @NotBlank()
    private String ngayHetHan;
}
