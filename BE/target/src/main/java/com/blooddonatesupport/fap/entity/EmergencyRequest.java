package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nhomMau;

    private String diaDiem;

    private String moTa;

    private LocalDateTime thoiGianTao = LocalDateTime.now();

    private boolean daXuLy = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nguoiTao_id")
    private User nguoiTao;
}