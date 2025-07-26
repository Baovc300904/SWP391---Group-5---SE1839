package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateStatusCompatibleBlood {
    @NotNull
    private int trangthai;
}
