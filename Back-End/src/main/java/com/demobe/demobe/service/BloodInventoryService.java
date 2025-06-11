package com.demobe.demobe.service;

public interface BloodInventoryService {
    void updateQuantityAndRecordReceiver(Integer id, Integer quantity, String requesterName);
}