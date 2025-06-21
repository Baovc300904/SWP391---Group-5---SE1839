package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChangeStatusDonationRequestDTO {
    @NotBlank()
    @Pattern(regexp = "dangcho|xacnhan|dahien|huy|tuchoi")
    private String trangthai;
}
