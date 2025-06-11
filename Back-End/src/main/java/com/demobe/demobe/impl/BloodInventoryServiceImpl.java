package com.demobe.demobe.impl;

import com.demobe.demobe.entity.BloodInventory;
import com.demobe.demobe.entity.BloodDonationReceiver;
import com.demobe.demobe.repository.BloodInventoryRepository;
import com.demobe.demobe.repository.BloodDonationReceiverRepository;
import com.demobe.demobe.service.BloodInventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BloodInventoryServiceImpl implements BloodInventoryService {

    private final BloodInventoryRepository bloodInventoryRepository;
    private final BloodDonationReceiverRepository bloodDonationReceiverRepository;

    @Autowired
    public BloodInventoryServiceImpl(BloodInventoryRepository bloodInventoryRepository,
                                     BloodDonationReceiverRepository bloodDonationReceiverRepository) {
        this.bloodInventoryRepository = bloodInventoryRepository;
        this.bloodDonationReceiverRepository = bloodDonationReceiverRepository;
    }

    @Override
    public void updateQuantityAndRecordReceiver(Integer id, Integer quantity, String requesterName) {
        Optional<BloodInventory> bloodInventory = bloodInventoryRepository.findById(id);
        bloodInventory.ifPresent(b -> {
            // Giảm số lượng khi người dùng nhận máu
            b.setQuantity(b.getQuantity() - quantity);

            // Nếu không còn máu, thay đổi trạng thái thành "Hết"
            if (b.getQuantity() <= 0) {
                b.setStatus("Hết");
            } else {
                b.setStatus("Còn");
            }

            // Lưu lại thay đổi vào kho máu
            bloodInventoryRepository.save(b);

            // Lưu thông tin yêu cầu nhận máu của người nhận
            BloodDonationReceiver receiver = new BloodDonationReceiver();
            receiver.setRequesterName(requesterName);
            receiver.setBloodInventoryId(b.getId());
            receiver.setQuantity(quantity);
            receiver.setRequestDate(LocalDateTime.now());
            receiver.setStatus("Còn");  // Trạng thái yêu cầu là "Còn"

            // Lưu vào bảng yêu cầu nhận máu
            bloodDonationReceiverRepository.save(receiver);
        });
    }
}
