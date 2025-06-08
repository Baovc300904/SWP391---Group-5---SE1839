package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "valid_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ValidToken {

    @Id
    @Column(name = "token", length = 500)
    private String token;

    @Column(name = "expiry_date", nullable = false)
    private LocalDateTime expiryDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Helper method to check if token is expired
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(this.expiryDate);
    }

    // Helper method to get user ID
    public Integer getUserId() {
        return user != null ? user.getUserId() : null;
    }
}
