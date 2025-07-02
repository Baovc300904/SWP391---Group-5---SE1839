package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChangeStatusBloodReceiveRequestToAvailable {

    @NotNull
    private int khoDonViMau;
}
