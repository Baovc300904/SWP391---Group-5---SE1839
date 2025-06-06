package com.blooddonatesupport.fap.service;

import com.blooddonatesupport.fap.entity.Inventory;
import com.blooddonatesupport.fap.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public List<Inventory> getAll() {
        return inventoryRepository.findAll();
    }

    public Inventory updateQuantity(Integer bloodGroupId, int delta) {
        Inventory inventory = inventoryRepository.findByBloodGroupId(bloodGroupId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhóm máu ID: " + bloodGroupId));

        BigDecimal newQuantity = inventory.getQuantity().add(BigDecimal.valueOf(delta));
        if (newQuantity.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Không đủ số lượng máu để trừ");
        }
        inventory.setQuantity(newQuantity);

        inventory.setQuantity(newQuantity);
        return inventoryRepository.save(inventory);
    }

}


