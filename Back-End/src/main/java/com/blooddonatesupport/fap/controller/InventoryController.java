package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.ErrorResponse;
import com.blooddonatesupport.fap.dto.UpdateInventoryRequest;
import com.blooddonatesupport.fap.entity.Inventory;
import com.blooddonatesupport.fap.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
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
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(@Valid @RequestBody UpdateInventoryRequest request) {
        try {
            Inventory updated = inventoryService.updateQuantity(request.getBloodGroup(), request.getChangeAmount());
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(400, e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(404, e.getMessage()));
        }
    }
}
