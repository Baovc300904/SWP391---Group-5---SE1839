package com.blooddonatesupport.fap.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyRequestDTO {
    private Integer bloodGroupId;        // ID nhóm máu (FK)
    private String bloodComponent;       // Thành phần máu (Toan Phan, Hong Cau, v.v.)
    private Integer quantity;            // Số lượng đơn vị máu cần
    private boolean urgent;              // Có phải yêu cầu khẩn không
    private String location;             // Nơi nhận máu
    private String description;          // Mô tả chi tiết tình trạng
}
