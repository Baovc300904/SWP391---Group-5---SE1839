package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "LienHeKhanCap")
public class EmergencyContact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaLienHe")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaNguoiDung", nullable = false)
    private User user;

    @Column(name = "HoVaTen", nullable = false, length = 100)
    private String fullName;

    @Column(name = "MoiQuanHe", length = 50)
    private String relationship;

    @Column(name = "SoDienThoai", nullable = false, length = 20)
    private String phoneNumber;

    @Column(length = 100)
    private String email;

    @Column(name = "CoTheLienHe")
    private Boolean canContact = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaNhomMau")
    private BloodGroup bloodGroup;
}
