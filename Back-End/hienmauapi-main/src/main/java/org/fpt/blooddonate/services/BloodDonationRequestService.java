package org.fpt.blooddonate.services;

import org.fpt.blooddonate.configs.AppConfig;
import org.fpt.blooddonate.dtos.requests.ChangeStatusDonationRequestDTO;
import org.fpt.blooddonate.dtos.requests.CompleteDonationRequestDTO;
import org.fpt.blooddonate.dtos.requests.CreateBloodDonationRequestDTO;
import org.fpt.blooddonate.dtos.requests.UpdateBloodDonationRequestDTO;
import org.fpt.blooddonate.models.*;
import org.fpt.blooddonate.repositories.*;
import org.fpt.blooddonate.utils.SendEmail;
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

    @Autowired
    private BloodUnitWareHouseRepository bloodUnitWareHouseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BloodRepository bloodRepository;

    public Page<BloodDonationRequest> getAll(int page, String status, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, 10);
        return repository.paginated(status, keyword, pageable);
    }

    public Page<BloodDonationRequest> getAllByUserId(int userId, int page, String status, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, 10);
        return repository.paginatedByUserId(userId, status, keyword, pageable);
    }

    public Optional<BloodDonationRequest> getById(Integer id) {
        return repository.findById(id);
    }

    public long getTotal() {
        return repository.count();
    }

    public BloodDonationRequest create(CreateBloodDonationRequestDTO payload) throws IOException {
        BloodDonationRequest bloodDonationRequest = new BloodDonationRequest();

        if (payload.getHoatDongHienMau() != null) {
            BloodDonationActivity bloodDonationActivity = bloodDonationActivityRespository.findById(payload.getHoatDongHienMau())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not existed blood donation activity"));

            if (bloodDonationActivity.getSoLuongNguoiToiDa() <= bloodDonationActivity.getSoLuongNguoiDangKyHienTai()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Apologies, but all slots for this blood donation event have been filled. Thank you for your interest!");
            }

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
        bloodDonationRequest.setSoLuong(payload.getSoLuong());
        bloodDonationRequest.setSucKhoeHienTai(payload.getSucKhoeHienTai());
        bloodDonationRequest.setDangMangThai(payload.getDangMangThai());
        bloodDonationRequest.setMacBenhTruyenNhiem(payload.getMacBenhTruyenNhiem());
        bloodDonationRequest.setNgayHienMauDuKien(LocalDate.parse(payload.getNgayHienMauDuKien()));
        bloodDonationRequest.setNgayPhucHoiGanNhat(LocalDate.parse(payload.getNgayPhucHoiGanNhat()));

        return repository.save(bloodDonationRequest);
    }

    public Optional<BloodDonationRequest> update(Integer id, UpdateBloodDonationRequestDTO payload) throws IOException {
        return repository.findById(id).map(bloodDonationRequest -> {
            bloodDonationRequest.setGhiChu(payload.getGhiChu());
            bloodDonationRequest.setLoaiHien(payload.getLoaiHien());
            bloodDonationRequest.setSoLuong(payload.getSoLuong());
            bloodDonationRequest.setSucKhoeHienTai(payload.getSucKhoeHienTai());
            bloodDonationRequest.setDangMangThai(payload.getDangMangThai());
            bloodDonationRequest.setMacBenhTruyenNhiem(payload.getMacBenhTruyenNhiem());
            bloodDonationRequest.setNgayHienMauDuKien(LocalDate.parse(payload.getNgayHienMauDuKien()));
            bloodDonationRequest.setNgayPhucHoiGanNhat(LocalDate.parse(payload.getNgayPhucHoiGanNhat()));
            return repository.save(bloodDonationRequest);
        });
    }

    public Optional<BloodDonationRequest> cancel(Integer id) throws IOException {
        return repository.findById(id).map(bloodDonationRequest -> {
            if (!bloodDonationRequest.getTrangThai().equals(AppConfig.BLOOD_DONATION_REQUEST_PENDING)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only cancel request when request is pending");
            }

            bloodDonationRequest.setTrangThai(AppConfig.BLOOD_DONATION_REQUEST_CANCEL);
            bloodDonationRequest.setGhiChu("User cancel blood donation request");

            User user = this.userRepository.findById(bloodDonationRequest.getNguoiHien().getId()).orElseThrow();
            SendEmail.changeBloodDonationRequestStatus(user.getEmail(), bloodDonationRequest.getId(), "huỷ");
            return repository.save(bloodDonationRequest);
        });
    }

    public Optional<BloodDonationRequest> approve(Integer id) throws IOException {
        return repository.findById(id).map(bloodDonationRequest -> {
            if (!bloodDonationRequest.getTrangThai().equals(AppConfig.BLOOD_DONATION_REQUEST_PENDING)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only approve request when request is pending");
            }

            Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = new User();
            user.setId(userId);
            bloodDonationRequest.setTrangThai(AppConfig.BLOOD_DONATION_REQUEST_APPROVED);
            bloodDonationRequest.setNguoiDuyet(user);
            bloodDonationRequest.setGhiChu("Admin approved blood donation request");

            User createdUser = this.userRepository.findById(bloodDonationRequest.getNguoiHien().getId()).orElseThrow();
            SendEmail.changeBloodDonationRequestStatus(createdUser.getEmail(), bloodDonationRequest.getId(), "xác nhận");
            return repository.save(bloodDonationRequest);
        });
    }

    public Optional<BloodDonationRequest> reject(Integer id, ChangeStatusDonationRequestDTO payload) throws IOException {
        return repository.findById(id).map(bloodDonationRequest -> {
//            if (!bloodDonationRequest.getTrangThai().equals(AppConfig.BLOOD_DONATION_REQUEST_PENDING)) {
//                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only reject request when request is pending");
//            }

            Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = new User();
            user.setId(userId);
            bloodDonationRequest.setTrangThai(AppConfig.BLOOD_DONATION_REQUEST_REJECTED);
            bloodDonationRequest.setNguoiDuyet(user);
            bloodDonationRequest.setFormKham(payload.getFormKham());
            bloodDonationRequest.setNgayDuyet(LocalDateTime.now());
            if (payload.getGhiChu().isEmpty() || payload.getGhiChu() == "") {
                bloodDonationRequest.setGhiChu("Admin rejected blood donation request");
            } else {
                bloodDonationRequest.setGhiChu(payload.getGhiChu());
            }

            User createdUser = this.userRepository.findById(bloodDonationRequest.getNguoiHien().getId()).orElseThrow();
            SendEmail.changeBloodDonationRequestStatus(createdUser.getEmail(), bloodDonationRequest.getId(), "từ chối");
            return repository.save(bloodDonationRequest);
        });
    }

    public Optional<BloodDonationRequest> complete(Integer id, CompleteDonationRequestDTO payload) throws IOException {
        return repository.findById(id).map(bloodDonationRequest -> {
            if (!bloodDonationRequest.getTrangThai().equals(AppConfig.BLOOD_DONATION_REQUEST_APPROVED)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only approve request when request is approved");
            }

            Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = new User();
            user.setId(userId);
            bloodDonationRequest.setTrangThai(AppConfig.BLOOD_DONATION_REQUEST_COMPLETED);
            bloodDonationRequest.setNguoiDuyet(user);
            bloodDonationRequest.setFormKham(payload.getFormKham());
            bloodDonationRequest.setNgayDuyet(LocalDateTime.now());
            bloodDonationRequest.setGhiChu("Admin completed blood donation request");

            User createdBy = userRepository.findById(bloodDonationRequest.getNguoiHien().getId())
                  .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not found user"));

            Blood blood = bloodRepository.findById(createdBy.getNhomMau().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not found blood"));

            BloodUnitWareHouse bloodUnitWareHouse = new BloodUnitWareHouse();
            bloodUnitWareHouse.setViTriLuuTru(payload.getViTriLuuTru());
            bloodUnitWareHouse.setSoLuong(bloodDonationRequest.getSoLuong());
            bloodUnitWareHouse.setThanhPhan(bloodDonationRequest.getLoaiHien());
            bloodUnitWareHouse.setNguoiHien(createdBy);
            bloodUnitWareHouse.setNhomMau(blood);
            bloodUnitWareHouse.setNgayLayMau(LocalDateTime.now());
            bloodUnitWareHouseRepository.save(bloodUnitWareHouse);

            User createdUser = this.userRepository.findById(bloodDonationRequest.getNguoiHien().getId()).orElseThrow();
            SendEmail.changeBloodDonationRequestStatus(createdUser.getEmail(), bloodDonationRequest.getId(), "đã hiến");
            return repository.save(bloodDonationRequest);
        });
    }
}
