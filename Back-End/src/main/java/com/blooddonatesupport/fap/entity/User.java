package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
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

    @Column(length = 5)
    private String bloodType;

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
    private String role = "USER";

    @Column(columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime registrationDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private AccountStatus accountStatus = AccountStatus.HoatDong;

    @Column(length = 20)
    private String provider = "local";

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BloodRequest> bloodRequests;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DonationRegistration> donations;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<EmergencyRequest> emergencyRequests;

    @PrePersist
    protected void onCreate() {
        if (registrationDate == null) {
            registrationDate = LocalDateTime.now();
        }
        if (accountStatus == null) {
            accountStatus = AccountStatus.HoatDong;
        }
        if (role == null) {
            role = "USER";
        }
        if (provider == null) {
            provider = "local";
        }
    }
}
