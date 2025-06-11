package com.demobe.demobe.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "blood_donation_receiver")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BloodDonationReceiver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String requesterName;        // Tên người nhận máu
    private Integer bloodInventoryId;    // ID của đơn vị máu trong bảng kho máu
    private Integer quantity;            // Số lượng máu yêu cầu
    private LocalDateTime requestDate;   // Thời gian yêu cầu nhận máu
    private String status;               // Trạng thái yêu cầu: Còn hay Hết
}
