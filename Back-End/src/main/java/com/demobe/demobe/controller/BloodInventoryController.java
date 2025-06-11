package com.demobe.demobe.controller;

import com.demobe.demobe.service.BloodInventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blood_inventory")
public class BloodInventoryController {

    private final BloodInventoryService bloodInventoryService;

    @Autowired
    public BloodInventoryController(BloodInventoryService bloodInventoryService) {
        this.bloodInventoryService = bloodInventoryService;
    }

    @PutMapping("/use")
    public ResponseEntity<Void> useBloodUnit(@RequestParam Integer id,
                                             @RequestParam Integer quantity,
                                             @RequestParam String requesterName) {
        // Gọi service để cập nhật kho máu và lưu yêu cầu nhận máu
        bloodInventoryService.updateQuantityAndRecordReceiver(id, quantity, requesterName);
        return ResponseEntity.ok().build();  // Trả về phản hồi OK sau khi cập nhật
    }
}
