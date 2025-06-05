package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ValidToken {
    @Id
    private String token;

    private Long userId;
}
