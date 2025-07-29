package org.fpt.blooddonate.services;

import org.fpt.blooddonate.configs.AppConfig;
import org.fpt.blooddonate.dtos.requests.CancelBloodUnitWareHouseRequestDTO;
import org.fpt.blooddonate.dtos.requests.TestedBloodUnitWareHouseRequestDTO;
import org.fpt.blooddonate.models.BloodUnitWareHouse;
import org.fpt.blooddonate.repositories.BloodUnitWareHouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BloodUnitWareHouseService {
    @Autowired
    private BloodUnitWareHouseRepository bloodUnitWareHouseRepository;

    public Page<BloodUnitWareHouse> getAll(int page, String status, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, 10);
        return bloodUnitWareHouseRepository.paginated(status, keyword, pageable);
    }

    public Optional<BloodUnitWareHouse> cancel(int id, CancelBloodUnitWareHouseRequestDTO payload) {
        return bloodUnitWareHouseRepository.findById(id).map(bloodUnitWareHouse -> {
            if (!bloodUnitWareHouse.getTrangThai().equals(AppConfig.BLOOD_UNIT_WAREHOUSE_WAIT_FOR_TESTING)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only cancel blood donate when it is wait for testing status");
            }

            bloodUnitWareHouse.setGhiChu(payload.getGhiChu());
            bloodUnitWareHouse.setTrangThai(AppConfig.BLOOD_UNIT_WAREHOUSE_CANCEL);
            return bloodUnitWareHouseRepository.save(bloodUnitWareHouse);
        });
    }

    public long getTotal() {
        return bloodUnitWareHouseRepository.count();
    }

    public Optional<BloodUnitWareHouse> tested(int id, TestedBloodUnitWareHouseRequestDTO payload) {
        return bloodUnitWareHouseRepository.findById(id).map(bloodUnitWareHouse -> {
            if (!bloodUnitWareHouse.getTrangThai().equals(AppConfig.BLOOD_UNIT_WAREHOUSE_WAIT_FOR_TESTING)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only tested blood donate when it is wait for testing status");
            }

            bloodUnitWareHouse.setKetQuaXetNghiem(payload.getKetQuaXetNghiem());
            bloodUnitWareHouse.setTrangThai(AppConfig.BLOOD_UNIT_WAREHOUSE_READY);
            bloodUnitWareHouse.setNgayHetHan(LocalDateTime.parse(payload.getNgayHetHan()));
            return bloodUnitWareHouseRepository.save(bloodUnitWareHouse);
        });
    }
}
