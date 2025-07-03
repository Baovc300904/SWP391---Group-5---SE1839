package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateBlogCategoryRequestDTO {
    @NotBlank()
    private String tieude;

    @NotBlank()
    private String noidung;
}
