package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blood_request")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nguoiNhan;

    private String nhomMauCan;

    private Integer soLuong;

    private String lyDo;

    private LocalDateTime ngayTao;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User nguoiGui;
}
