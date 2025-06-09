package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.dto.ErrorResponse;
import com.blooddonatesupport.fap.dto.UpdateInventoryRequest;
import com.blooddonatesupport.fap.entity.Inventory;
import com.blooddonatesupport.fap.service.InventoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
@Slf4j
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            // ✅ Sử dụng method đúng từ InventoryService
            Map<String, BigDecimal> inventoryByGroup = inventoryService.getInventoryByBloodGroup();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Lấy danh sách kho máu thành công");
            response.put("data", inventoryByGroup);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error getting inventory: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    @GetMapping("/by-component")
    public ResponseEntity<?> getByComponent() {
        try {
            Map<Inventory.BloodComponent, BigDecimal> componentInventory =
                    inventoryService.getAvailableByComponent();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Lấy kho máu theo thành phần thành công");
            response.put("data", componentInventory);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error getting inventory by component: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    @GetMapping("/expiring")
    @PreAuthorize("hasRole('ADMIN') or hasRole('NHAN_VIEN')")
    public ResponseEntity<?> getExpiringSoon(@RequestParam(defaultValue = "7") int days) {
        try {
            List<Inventory> expiring = inventoryService.getExpiringSoon(days);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Lấy danh sách máu sắp hết hạn thành công");
            response.put("data", expiring);
            response.put("count", expiring.size());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error getting expiring inventory: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(@Valid @RequestBody UpdateInventoryRequest request,
                                    BindingResult bindingResult) {
        try {
            // ✅ Kiểm tra validation errors
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = new HashMap<>();
                bindingResult.getFieldErrors().forEach(error ->
                        errors.put(error.getField(), error.getDefaultMessage())
                );

                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Dữ liệu không hợp lệ");
                response.put("errors", errors);

                return ResponseEntity.badRequest().body(response);
            }

            // ✅ Sử dụng đúng parameters cho updateQuantity method
            Inventory updated = inventoryService.updateQuantity(
                    request.getBloodUnitId(),
                    request.getNewQuantity()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Cập nhật số lượng máu thành công");
            response.put("data", updated);

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            log.warn("Invalid argument for inventory update: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(400, e.getMessage()));
        } catch (RuntimeException e) {
            log.warn("Runtime error for inventory update: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(404, e.getMessage()));
        } catch (Exception e) {
            log.error("Error updating inventory: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    @GetMapping("/low-stock")
    @PreAuthorize("hasRole('ADMIN') or hasRole('NHAN_VIEN')")
    public ResponseEntity<?> getLowStock(@RequestParam(defaultValue = "10") BigDecimal threshold) {
        try {
            Map<String, BigDecimal> allInventory = inventoryService.getInventoryByBloodGroup();

            Map<String, BigDecimal> lowStock = new HashMap<>();
            allInventory.forEach((bloodGroup, quantity) -> {
                if (quantity.compareTo(threshold) < 0) {
                    lowStock.put(bloodGroup, quantity);
                }
            });

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Lấy danh sách máu sắp hết thành công");
            response.put("data", lowStock);
            response.put("threshold", threshold);
            response.put("count", lowStock.size());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error getting low stock inventory: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ADMIN') or hasRole('NHAN_VIEN')")
    public ResponseEntity<?> getStatistics() {
        try {
            Map<String, BigDecimal> byGroup = inventoryService.getInventoryByBloodGroup();
            Map<Inventory.BloodComponent, BigDecimal> byComponent = inventoryService.getAvailableByComponent();

            BigDecimal totalQuantity = byGroup.values().stream()
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            Map<String, Object> statistics = new HashMap<>();
            statistics.put("totalQuantity", totalQuantity);
            statistics.put("bloodGroupCount", byGroup.size());
            statistics.put("componentCount", byComponent.size());
            statistics.put("inventoryByGroup", byGroup);
            statistics.put("inventoryByComponent", byComponent);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Lấy thống kê kho máu thành công");
            response.put("data", statistics);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error getting inventory statistics: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, "Lỗi hệ thống"));
        }
    }
}