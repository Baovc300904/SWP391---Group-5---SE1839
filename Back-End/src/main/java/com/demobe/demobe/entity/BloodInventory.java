package com.demobe.demobe.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "thu_vien_mau")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BloodInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String bloodType;       // Nhóm máu (O+, A-, etc.)
    private String component;       // Thành phần máu (Hồng cầu, Tiểu cầu, Huyết tương)
    private Integer quantity;       // Số lượng đơn vị máu
    private LocalDate expiryDate;   // Hạn sử dụng của đơn vị máu
    private String status;          // Trạng thái: Còn, Hết
}