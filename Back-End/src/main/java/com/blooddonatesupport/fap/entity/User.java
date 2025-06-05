package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;
import lombok.*;

@Entity
@Table(name = "User")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 20)
    private String phoneNumber;

    private LocalDate dateOfBirth;

    @Column(length = 10)
    private String gender;

    @Column(length = 255)
    private String address;

    private Integer bloodType;

    @Column(length = 5)
    private String rhFactor;

    @Lob
    private String medicalHistory;

    @Column(precision = 5, scale = 2)
    private BigDecimal weight;

    @Column(precision = 5, scale = 2)
    private BigDecimal height;

    @Column(length = 50)
    private String currentHealthStatus;

    @Column(nullable = false, length = 50)
    private String role;

    @Column(columnDefinition = "DATETIME DEFAULT GETDATE()")
    private LocalDateTime registrationDate;

    @Column(length = 50)
    private String accountStatus = "Active";

    @Column(length = 20)
    private String provider;
}
