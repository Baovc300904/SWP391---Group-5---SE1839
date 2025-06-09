
package com.blooddonatesupport.fap.dto;

import com.blooddonatesupport.fap.entity.User;
import lombok.Data;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class UserProfileDTO {

    @NotBlank(message = "Họ và tên không được để trống")
    @Size(max = 100, message = "Họ và tên không được vượt quá 100 ký tự")
    private String fullName;

    @Pattern(regexp = "^[0-9]{10,11}$", message = "Số điện thoại phải có 10-11 chữ số")
    private String phoneNumber;

    @Past(message = "Ngày sinh phải là ngày trong quá khứ")
    private LocalDate dateOfBirth;

    // ✅ Sử dụng enum thay vì String
    private User.Gender gender;

    @Size(max = 255, message = "Địa chỉ không được vượt quá 255 ký tự")
    private String address;

    // ✅ Sử dụng bloodGroupId thay vì bloodType
    private Integer bloodGroupId;

    // ✅ Sử dụng enum thay vì String
    private User.RhFactor rhFactor;

    @Size(max = 1000, message = "Tiền sử bệnh không được vượt quá 1000 ký tự")
    private String medicalHistory;

    @DecimalMin(value = "30.0", message = "Cân nặng phải lớn hơn 30kg")
    @DecimalMax(value = "200.0", message = "Cân nặng phải nhỏ hơn 200kg")
    private BigDecimal weight;

    @DecimalMin(value = "100.0", message = "Chiều cao phải lớn hơn 100cm")
    @DecimalMax(value = "250.0", message = "Chiều cao phải nhỏ hơn 250cm")
    private BigDecimal height;

    // ✅ Sử dụng enum thay vì String
    private User.HealthStatus currentHealthStatus;
}

