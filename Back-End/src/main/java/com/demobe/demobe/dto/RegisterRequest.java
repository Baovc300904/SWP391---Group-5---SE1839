package com.demobe.demobe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterRequest {
    private String username;
    private String email;
    private String fullName;
    private String password;
}