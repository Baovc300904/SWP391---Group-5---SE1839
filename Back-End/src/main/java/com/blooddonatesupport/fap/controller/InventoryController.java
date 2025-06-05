package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.UpdateInventoryRequest;
import com.blooddonatesupport.fap.entity.Inventory;
import com.blooddonatesupport.fap.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<Inventory>> getAll() {
        return ResponseEntity.ok(inventoryService.getAll());
    }

    @PutMapping("/update")
    public ResponseEntity<Inventory> update(@RequestBody UpdateInventoryRequest request) {
        Inventory updated = inventoryService.updateQuantity(request.getBloodGroup(), request.getChangeAmount());
        return ResponseEntity.ok(updated);
    }
}
