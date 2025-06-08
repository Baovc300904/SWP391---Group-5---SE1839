package com.blooddonatesupport.fap.service;

import com.blooddonatesupport.fap.entity.BloodGroup;
import com.blooddonatesupport.fap.entity.Inventory;
import com.blooddonatesupport.fap.repository.BloodGroupRepository;
import com.blooddonatesupport.fap.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final BloodGroupRepository bloodGroupRepository;
    private final EmailService emailService;

    @Cacheable("bloodInventoryByGroup")
    public Map<String, BigDecimal> getInventoryByBloodGroup() {
        List<Inventory> inventories = inventoryRepository.findByStatus(Inventory.BloodStatus.San_Sang);

        return inventories.stream()
                .filter(inv -> inv.getExpiredDate().isAfter(LocalDate.now()))
                .collect(Collectors.groupingBy(
                        inv -> inv.getBloodGroup().getBloodGroupName(),
                        Collectors.reducing(BigDecimal.ZERO,
                                Inventory::getQuantity,
                                BigDecimal::add)
                ));
    }

    @Cacheable("availableBloodComponents")
    public Map<Inventory.BloodComponent, BigDecimal> getAvailableByComponent() {
        List<Inventory> available = inventoryRepository.findByStatus(Inventory.BloodStatus.San_Sang);

        return available.stream()
                .filter(inv -> inv.getExpiredDate().isAfter(LocalDate.now()))
                .collect(Collectors.groupingBy(
                        Inventory::getBloodComponent,
                        Collectors.reducing(BigDecimal.ZERO,
                                Inventory::getQuantity,
                                BigDecimal::add)
                ));
    }

    @Transactional
    public Inventory updateQuantity(Integer bloodUnitId, BigDecimal newQuantity) {
        try {
            Inventory inventory = inventoryRepository.findById(bloodUnitId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn vị máu ID: " + bloodUnitId));

            if (newQuantity.compareTo(BigDecimal.ZERO) < 0) {
                throw new IllegalArgumentException("Số lượng không thể âm");
            }

            inventory.setQuantity(newQuantity);
            Inventory saved = inventoryRepository.save(inventory);

            // Check low stock for this blood group
            checkLowStockAlert(inventory.getBloodGroupId());

            log.info("Updated blood unit {}: new quantity = {}", bloodUnitId, newQuantity);
            return saved;
        } catch (Exception e) {
            log.error("Error updating blood unit quantity: {}", e.getMessage(), e);
            throw new RuntimeException("Lỗi cập nhật số lượng máu", e);
        }
    }

    private void checkLowStockAlert(Integer bloodGroupId) {
        Map<String, BigDecimal> inventory = getInventoryByBloodGroup();
        BloodGroup bloodGroup = bloodGroupRepository.findById(bloodGroupId).orElse(null);

        if (bloodGroup != null) {
            BigDecimal totalQuantity = inventory.getOrDefault(bloodGroup.getBloodGroupName(), BigDecimal.ZERO);

            if (totalQuantity.compareTo(BigDecimal.valueOf(10)) < 0) {
                sendLowStockAlert(bloodGroup, totalQuantity);
            }
        }
    }

    private void sendLowStockAlert(BloodGroup bloodGroup, BigDecimal quantity) {
        try {
            String subject = "Cảnh báo: Lượng máu thấp - " + bloodGroup.getBloodGroupName();
            String body = String.format("Nhóm máu %s chỉ còn %s đơn vị trong kho",
                    bloodGroup.getBloodGroupName(), quantity);
            emailService.sendEmail("admin@blooddonation.com", subject, body);
            log.info("Low stock alert sent for blood group: {}", bloodGroup.getBloodGroupName());
        } catch (Exception e) {
            log.error("Failed to send low stock alert: {}", e.getMessage());
        }
    }

    public List<Inventory> getExpiringSoon(int days) {
        LocalDate cutoffDate = LocalDate.now().plusDays(days);
        return inventoryRepository.findByExpiredDateBeforeAndStatus(cutoffDate, Inventory.BloodStatus.San_Sang);
    }
    // ✅ Thêm method này vào InventoryService nếu muốn get all raw inventory records
    @Cacheable("allInventory")
    public List<Inventory> getAllInventory() {
        try {
            List<Inventory> inventories = inventoryRepository.findAll();
            log.info("Retrieved {} inventory records", inventories.size());
            return inventories;
        } catch (Exception e) {
            log.error("Error getting all inventory: {}", e.getMessage(), e);
            throw new RuntimeException("Lỗi lấy danh sách kho máu", e);
        }
    }

    @Cacheable("availableInventory")
    public List<Inventory> getAvailableInventory() {
        try {
            List<Inventory> available = inventoryRepository.findByStatus(Inventory.BloodStatus.San_Sang)
                    .stream()
                    .filter(inv -> inv.getExpiredDate().isAfter(LocalDate.now()))
                    .collect(Collectors.toList());

            log.info("Retrieved {} available inventory records", available.size());
            return available;
        } catch (Exception e) {
            log.error("Error getting available inventory: {}", e.getMessage(), e);
            throw new RuntimeException("Lỗi lấy danh sách máu có sẵn", e);
        }
    }
}