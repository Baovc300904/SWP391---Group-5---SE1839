package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateSupportTicketRequestDTO {
    @NotBlank()
    private String hoten;

    @NotBlank()
    @Email()
    private String email;

    @NotBlank()
    private String sodienthoai;

    @NotBlank()
    private String tieude;

    @NotBlank()
    private String noidung;
}
