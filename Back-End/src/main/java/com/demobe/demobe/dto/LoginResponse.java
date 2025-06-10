package com.demobe.demobe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {
    private String message;    // Thông báo thành công hoặc lỗi
    private String username;   // Username nếu đăng nhập thành công, null nếu lỗi
    private String role;       // Role nếu đăng nhập thành công, null nếu lỗi
}
