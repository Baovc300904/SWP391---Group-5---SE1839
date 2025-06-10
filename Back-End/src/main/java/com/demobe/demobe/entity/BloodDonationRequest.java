package com.demobe.demobe.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.demobe.demobe.enums.UrgencyLevel;

@Entity
@Table(name = "YeuCauHienMau")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloodDonationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaYeuCauHienMau")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "MaNguoiDung", nullable = false)
    private User requester;

    @ManyToOne
    @JoinColumn(name = "MaHoatDong")
    private BloodDonationEvent event;

    @Column(name = "NgayDangKy")
    private LocalDateTime registrationDate = LocalDateTime.now();

    @Column(name = "NgayHienMauDuKien", nullable = false)
    private LocalDate expectedDonationDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "LoaiHien", nullable = false)
    private DonationType donationType;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai", nullable = false)
    private RequestStatus status;

    @Column(name = "NgayPhucHoiGanNhat")
    private LocalDate lastRecoveryDate;

    @Column(name = "NgayPhucHoiDuKien")
    private LocalDate expectedRecoveryDate; // ➕ Dùng cho nhắc nhở

    @Column(name = "GhiChu", columnDefinition = "TEXT")
    private String note;

    @ManyToOne
    @JoinColumn(name = "MaNguoiDuyet")
    private User approver;

    @Column(name = "NgayDuyet")
    private LocalDateTime approvalDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "MucDoKhanCap")
    private UrgencyLevel urgencyLevel = UrgencyLevel.NORMAL;

    public enum DonationType {
        Toan_Phan, Hong_Cau, Tieu_Cau, Huyet_Tuong
    }

    public enum RequestStatus {
        Dang_Cho, Da_Xac_Nhan, Da_Hien, Huy, Tu_Choi
    }
}
