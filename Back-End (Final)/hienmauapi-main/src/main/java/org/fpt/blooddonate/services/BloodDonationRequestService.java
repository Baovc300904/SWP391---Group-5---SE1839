package org.fpt.blooddonate.services;

import org.fpt.blooddonate.dtos.requests.ChangeStatusDonationRequestDTO;
import org.fpt.blooddonate.dtos.requests.CreateBloodDonationRequestDTO;
import org.fpt.blooddonate.dtos.requests.UpdateBloodDonationRequestDTO;
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

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BloodDonationRequestService {
    @Autowired
    private BloodDonationRequestRepository repository;

    @Autowired
    private BloodDonationActivityRespository bloodDonationActivityRespository;


    public Page<BloodDonationRequest> getAll(int page, String status, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, 20);
        return repository.paginated(status, keyword, pageable);
    }

    public Optional<BloodDonationRequest> getById(Integer id) {
        return repository.findById(id);
    }

    public BloodDonationRequest create(CreateBloodDonationRequestDTO payload) throws IOException {
        BloodDonationRequest bloodDonationRequest = new BloodDonationRequest();

        if (payload.getHoatDongHienMau() != null) {
            BloodDonationActivity bloodDonationActivity = bloodDonationActivityRespository.findById(payload.getHoatDongHienMau())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not existed blood donation activity"));

            bloodDonationRequest.setHoatDongHienMau(bloodDonationActivity);
            // Update total user in blood donation activity
            bloodDonationActivity.setSoLuongNguoiDangKyHienTai(bloodDonationActivity.getSoLuongNguoiDangKyHienTai() + 1);
            bloodDonationActivityRespository.save(bloodDonationActivity);
        }

        Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = new User();
        user.setId(userId);
        bloodDonationRequest.setNguoiHien(user);
        bloodDonationRequest.setGhiChu(payload.getGhiChu());
        bloodDonationRequest.setLoaiHien(payload.getLoaiHien());
        bloodDonationRequest.setNgayHienMauDuKien(LocalDate.parse(payload.getNgayHienMauDuKien()));
        bloodDonationRequest.setNgayPhucHoiGanNhat(LocalDate.parse(payload.getNgayPhucHoiGanNhat()));

        return repository.save(bloodDonationRequest);
    }

    public Optional<BloodDonationRequest> update(Integer id, UpdateBloodDonationRequestDTO payload) throws IOException {
        return repository.findById(id).map(bloodDonationRequest -> {
            bloodDonationRequest.setGhiChu(payload.getGhiChu());
            bloodDonationRequest.setLoaiHien(payload.getLoaiHien());
            bloodDonationRequest.setNgayHienMauDuKien(LocalDate.parse(payload.getNgayHienMauDuKien()));
            bloodDonationRequest.setNgayPhucHoiGanNhat(LocalDate.parse(payload.getNgayPhucHoiGanNhat()));
            return repository.save(bloodDonationRequest);
        });
    }

    public Optional<BloodDonationRequest> changeStatus(Integer id, ChangeStatusDonationRequestDTO payload) throws IOException {
        return repository.findById(id).map(bloodDonationRequest -> {
            Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = new User();
            user.setId(userId);
            bloodDonationRequest.setTrangThai(payload.getTrangthai());
            bloodDonationRequest.setNguoiDuyet(user);
            bloodDonationRequest.setNgayDuyet(LocalDateTime.now());
            return repository.save(bloodDonationRequest);
        });
    }
}
