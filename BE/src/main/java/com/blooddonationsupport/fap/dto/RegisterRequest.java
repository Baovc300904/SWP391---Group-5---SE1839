package BE.src.main.java.com.blooddonationsupport.fap.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String hoVaTen;
    private String tenDangNhap;
    private String email;
    private String matKhau;
}
