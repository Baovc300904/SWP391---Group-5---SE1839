package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateCompatibleBloodDTO {
    @NotNull
    private int nhomMauHien;

    @NotNull
    private int nhomMauNhan;
}
