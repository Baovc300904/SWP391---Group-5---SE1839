package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "KhoDonViMau")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaDonViMau")
    private Integer bloodUnitId;
    
    @Column(name = "MaNhomMau", nullable = false)
    private Integer bloodGroupId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaNhomMau", insertable = false, updatable = false)
    private BloodGroup bloodGroup;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "ThanhPhanMau", nullable = false)
    private BloodComponent bloodComponent;
    
    @Column(name = "SoLuong", nullable = false, precision = 10, scale = 2)
    private BigDecimal quantity;
    
    @Column(name = "NgayLayMau", nullable = false)
    private LocalDate collectionDate;
    
    @Column(name = "NgayHetHan", nullable = false)
    private LocalDate expiredDate;
    
    @Column(name = "MaNguoiHien")
    private Integer donorId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaNguoiHien", insertable = false, updatable = false)
    private User donor;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai", nullable = false)
    private BloodStatus status;
    
    @Column(name = "KetQuaXetNghiem", columnDefinition = "TEXT")
    private String testResults;
    
    @Column(name = "ViTriLuuTru", length = 100)
    private String storageLocation;
    
    @Column(name = "NgayNhapKho")
    private LocalDateTime entryDate;
    
    // Enums
    public enum BloodComponent {
        Toan_Phan, Hong_Cau, Huyet_Tuong, Tieu_Cau
    }
    
    public enum BloodStatus {
        San_Sang, Da_Su_Dung, Huy_Bo, Cho_Xet_Nghiem
    }
}