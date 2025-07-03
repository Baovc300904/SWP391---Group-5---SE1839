package org.fpt.blooddonate.services;

import org.fpt.blooddonate.configs.AppConfig;
import org.fpt.blooddonate.dtos.requests.CreateBloodRequestDTO;
import org.fpt.blooddonate.dtos.requests.UpdateBloodRequestDTO;
import org.fpt.blooddonate.models.Blood;
import org.fpt.blooddonate.repositories.BloodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BloodService {
    @Autowired
    private BloodRepository repository;

    public List<Blood> getAll() {
        return repository.findAll();
    }

    public Optional<Blood> getById(Integer id) {
        return repository.findById(id);
    }

    public Blood create(CreateBloodRequestDTO payload) {
        Blood blood = new Blood();
        blood.setTen(payload.getTen());
        blood.setMota(payload.getMota());
        return repository.save(blood);
    }

    public Optional<Blood> update(Integer id, UpdateBloodRequestDTO payload) {
        return repository.findById(id).map(blood -> {
            blood.setTen(payload.getTen());
            blood.setMota(payload.getMota());
            return repository.save(blood);
        });
    }

    public Optional<Blood> delete(Integer id) {
        return repository.findById(id).map(blood -> {
            blood.setTrangThai(AppConfig.INACTIVE_STATUS);
            return repository.save(blood);
        });
    }
}
