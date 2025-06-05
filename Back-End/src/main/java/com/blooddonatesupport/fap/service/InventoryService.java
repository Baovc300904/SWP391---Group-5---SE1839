package com.blooddonatesupport.fap.service;

import com.blooddonatesupport.fap.entity.Inventory;
import com.blooddonatesupport.fap.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public List<Inventory> getAll() {
        return inventoryRepository.findAll();
    }

    public Inventory updateQuantity(String nhomMau, int thayDoi) {
        Inventory inventory = inventoryRepository.findByNhomMau(nhomMau)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhóm máu: " + nhomMau));

        int newQuantity = inventory.getQuantity() + thayDoi;
        if (newQuantity < 0) {
            throw new IllegalArgumentException("Không đủ số lượng máu để trừ");
        }
        inventory.setQuantity(newQuantity);
        return inventoryRepository.save(inventory);
    }
}

