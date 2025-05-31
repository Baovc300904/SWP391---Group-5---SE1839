package com.blooddonatesupport.fap.dto;

import lombok.*;

@Getter @Setter
public class ChangePasswordRequest {
    private String oldPassword;
    private String newPassword;
}