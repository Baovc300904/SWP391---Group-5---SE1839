package org.fpt.blooddonate.dtos.responses;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.fpt.blooddonate.models.User;

@Data
@NoArgsConstructor
public class LoginResponseDTO {
    private User user;
    private String token;
}
