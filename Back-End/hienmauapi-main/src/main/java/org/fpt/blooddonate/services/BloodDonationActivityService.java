package org.fpt.blooddonate.services;

import org.fpt.blooddonate.configs.AppConfig;
import org.fpt.blooddonate.dtos.requests.CreateBloodDonationActivityRequestDTO;
import org.fpt.blooddonate.dtos.requests.UpdateBloodDonationActivityRequestDTO;
import org.fpt.blooddonate.models.BloodDonationActivity;
import org.fpt.blooddonate.models.BloodDonationRequest;
import org.fpt.blooddonate.models.User;
import org.fpt.blooddonate.repositories.BloodDonationActivityRespository;
import org.fpt.blooddonate.repositories.BloodDonationRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class BloodDonationActivityService {
    @Autowired
    private BloodDonationActivityRespository repository;

    @Autowired
    private BloodDonationRequestRepository bloodDonationRequestRepository;

    public Page<BloodDonationActivity> getAll(int page, String status, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, 10);
        return repository.paginated(status, keyword, pageable);
    }

    public BloodDonationActivity getById(Integer id) {
        BloodDonationActivity bloodDonationActivity = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not existed activity"));

        List<BloodDonationRequest> list = Collections.emptyList();
        bloodDonationActivity.setDanhSachYeuCauHieuMau(list);
        return bloodDonationActivity;
    }

    public Optional<BloodDonationActivity> getDetailById(Integer id) {
        return repository.findById(id);
    }

    public BloodDonationActivity create(CreateBloodDonationActivityRequestDTO payload) throws IOException {
        Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = new User();
        user.setId(userId);

        BloodDonationActivity bloodDonationActivity = new BloodDonationActivity();
        bloodDonationActivity.setNguoiTao(user);
        bloodDonationActivity.setTen(payload.getTen());
        bloodDonationActivity.setDiaDiem(payload.getDiaDiem());
        bloodDonationActivity.setMoTa(payload.getMoTa());
        bloodDonationActivity.setSoLuongNguoiToiDa(payload.getSoLuongNguoiToiDa());
        bloodDonationActivity.setNgayBatDau(LocalDate.parse(payload.getNgayBatDau()));
        bloodDonationActivity.setNgayKetThuc(LocalDate.parse(payload.getNgayKetThuc()));
        bloodDonationActivity.setTrangThaiHoatDong(AppConfig.BLOOD_DONATION_ACTIVITY_COMMING_SOOM);
        return repository.save(bloodDonationActivity);
    }

    public Optional<BloodDonationActivity> update(Integer id, UpdateBloodDonationActivityRequestDTO payload) throws IOException {
        return repository.findById(id).map(bloodDonationActivity -> {
            if (!bloodDonationActivity.getTrangThaiHoatDong().equals(AppConfig.BLOOD_DONATION_REQUEST_PENDING)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only update pending blood donation request");
            }

            Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (bloodDonationActivity.getNguoiTao().getId() != userId) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not the owner of this request.");
            }

            bloodDonationActivity.setTen(payload.getTen());
            bloodDonationActivity.setDiaDiem(payload.getDiaDiem());
            bloodDonationActivity.setMoTa(payload.getMoTa());
            bloodDonationActivity.setNgayBatDau(LocalDate.parse(payload.getNgayBatDau()));
            bloodDonationActivity.setNgayKetThuc(LocalDate.parse(payload.getNgayKetThuc()));
            bloodDonationActivity.setSoLuongNguoiToiDa(payload.getSoLuongNguoiToiDa());
            return repository.save(bloodDonationActivity);
        });
    }
}
