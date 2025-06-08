package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "LoaiNhomMau")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodGroup {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaNhomMau")
    private Integer bloodGroupId;
    
    @Column(name = "TenNhomMau", unique = true, nullable = false, length = 10)
    private String bloodGroupName; // A+, B-, O+, etc.
    
    @Column(name = "MoTa", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "TuongThichNhan")
    private String compatibleRecipients; // Có thể nhận từ ai
    
    @Column(name = "TuongThichHien") 
    private String compatibleDonors; // Có thể hiến cho ai
}