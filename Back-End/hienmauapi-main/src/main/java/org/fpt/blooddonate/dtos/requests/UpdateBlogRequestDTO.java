package org.fpt.blooddonate.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class UpdateBlogRequestDTO {
    @NotBlank()
    private String tieude;

    @NotBlank()
    private String noidung;

    private MultipartFile anh;

    @NotNull
    private Integer danhmuc;
}
