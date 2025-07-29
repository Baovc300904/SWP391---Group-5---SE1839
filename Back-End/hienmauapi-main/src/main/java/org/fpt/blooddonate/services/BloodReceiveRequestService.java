package org.fpt.blooddonate.services;

import org.fpt.blooddonate.configs.AppConfig;
import org.fpt.blooddonate.dtos.requests.*;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BloodReceiveRequestService {
    @Autowired
    private BloodReceiveRequestRepository repository;

    @Autowired
    private BloodUnitWareHouseRepository bloodUnitWareHouseRepository;

    @Autowired
    private CompatibleBloodRepository compatibleBloodRepository;

    @Autowired
    private BloodRepository bloodRepository;

    @Autowired
    private UserRepository userRepository;

    public Page<BloodReceiveRequest> getAll(int page, String status, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, 10);
        return repository.paginated(status, keyword, pageable);
    }

    public Page<BloodReceiveRequest> getAllByUserId(int userId, int page, String status, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, 10);
        return repository.paginatedByUserId(userId, status, keyword, pageable);
    }

    public Optional<BloodReceiveRequest> getById(Integer id) {
        return repository.findById(id);
    }

    public long getTotal() {
        return repository.count();
    }

    public BloodReceiveRequest create(CreateReceiveDonationRequestDTO payload) throws IOException {
        BloodReceiveRequest bloodReceiveRequest = new BloodReceiveRequest();
        Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = new User();
        user.setId(userId);

        Blood blood = this.bloodRepository.findById(payload.getNhomMau())
              .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not existed blood"));

        bloodReceiveRequest.setNhomMau(blood);
        bloodReceiveRequest.setNguoiNhan(user);
        bloodReceiveRequest.setKhanCap(payload.getKhanCap() == 1);
        bloodReceiveRequest.setLyDo(payload.getLyDo());
        bloodReceiveRequest.setDiaChiNhanMau(payload.getDiaChiNhanMau());
        bloodReceiveRequest.setThanhPhanMauCan(payload.getThanhPhanMauCan());
        bloodReceiveRequest.setNgayNhanMauDuKien(LocalDate.parse(payload.getNgayNhanMauDuKien()));
        bloodReceiveRequest.setSoLuongDonVi(payload.getSoLuongDonVi());
        bloodReceiveRequest.setSucKhoeHienTai(payload.getSucKhoeHienTai());
        bloodReceiveRequest.setDangMangThai(payload.getDangMangThai());
        bloodReceiveRequest.setMacBenhTruyenNhiem(payload.getMacBenhTruyenNhiem());
        return repository.save(bloodReceiveRequest);
    }

    public Optional<BloodReceiveRequest> update(Integer id, UpdateReceiveDonationRequestDTO payload) throws IOException {
        return repository.findById(id).map(bloodReceiveRequest -> {
            if (!bloodReceiveRequest.getTrangThai().equals(AppConfig.BLOOD_RECEIVE_REQUEST_PENDING)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only update request when request is pending");
            }

            Blood blood = this.bloodRepository.findById(payload.getNhomMau())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not existed blood"));

            bloodReceiveRequest.setNhomMau(blood);
            bloodReceiveRequest.setKhanCap(payload.getKhanCap() == 1);
            bloodReceiveRequest.setLyDo(payload.getLyDo());
            bloodReceiveRequest.setDiaChiNhanMau(payload.getDiaChiNhanMau());
            bloodReceiveRequest.setThanhPhanMauCan(payload.getThanhPhanMauCan());
            bloodReceiveRequest.setNgayNhanMauDuKien(LocalDate.parse(payload.getNgayNhanMauDuKien()));
            bloodReceiveRequest.setSoLuongDonVi(payload.getSoLuongDonVi());
            bloodReceiveRequest.setSucKhoeHienTai(payload.getSucKhoeHienTai());
            bloodReceiveRequest.setDangMangThai(payload.getDangMangThai());
            bloodReceiveRequest.setMacBenhTruyenNhiem(payload.getMacBenhTruyenNhiem());
            return repository.save(bloodReceiveRequest);
        });
    }


    public Optional<BloodReceiveRequest> cancel(Integer id) throws IOException {
        return repository.findById(id).map(bloodReceiveRequest -> {
            if (!bloodReceiveRequest.getTrangThai().equals(AppConfig.BLOOD_RECEIVE_REQUEST_PENDING)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only cancel request when request is pending");
            }

            bloodReceiveRequest.setTrangThai(AppConfig.BLOOD_RECEIVE_REQUEST_CANCEL);
            bloodReceiveRequest.setGhiChu("User cancel blood receive request");
            User user = this.userRepository.findById(bloodReceiveRequest.getNguoiNhan().getId()).orElseThrow();
            SendEmail.changeBloodReceiveRequestStatus(user.getEmail(), bloodReceiveRequest.getId(), "huỷ");
            return repository.save(bloodReceiveRequest);
        });
    }

    public Optional<BloodReceiveRequest> available(Integer id, ChangeStatusBloodReceiveRequestToAvailable payload) throws IOException {
        return repository.findById(id).map(bloodReceiveRequest -> {
            if (!bloodReceiveRequest.getTrangThai().equals(AppConfig.BLOOD_RECEIVE_REQUEST_PENDING)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only available request when request is pending");
            }

            List<BloodUnitWareHouse> listBloodUnitWareHouse = new ArrayList<>();
            int totalQuantity = 0;
            for (Integer bloodUnitId: payload.getDanhSachKhoDonViMau()) {
                BloodUnitWareHouse bloodUnitWareHouse = bloodUnitWareHouseRepository.findById(bloodUnitId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not existed blood unit warehouse"));

                if (!bloodUnitWareHouse.getTrangThai().equals(AppConfig.BLOOD_UNIT_WAREHOUSE_READY)) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Blood unit warehouse is not ready");
                }

                totalQuantity += bloodUnitWareHouse.getSoLuong();
                listBloodUnitWareHouse.add(bloodUnitWareHouse);
            }

            if (totalQuantity < bloodReceiveRequest.getSoLuongDonVi()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Blood unit warehouse is not enough");
            }

            // Update blood receive id in blood unit database
            for (Integer bloodUnitId: payload.getDanhSachKhoDonViMau()) {
                BloodUnitWareHouse bloodUnitWareHouse = bloodUnitWareHouseRepository.findById(bloodUnitId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not existed blood unit warehouse"));

                bloodUnitWareHouse.setYeuCauCanMau(bloodReceiveRequest);
                this.bloodUnitWareHouseRepository.save(bloodUnitWareHouse);
            }

            Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = new User();
            user.setId(userId);
            bloodReceiveRequest.setNguoiDuyet(user);
            bloodReceiveRequest.setNgayDuyet(LocalDateTime.now());
            bloodReceiveRequest.setTrangThai(AppConfig.BLOOD_RECEIVE_REQUEST_HAVE_BLOOD);
            bloodReceiveRequest.setGhiChu("Admin change request status to available");

            User userCreated = this.userRepository.findById(bloodReceiveRequest.getNguoiNhan().getId()).orElseThrow();
            SendEmail.changeBloodReceiveRequestStatus(userCreated.getEmail(), bloodReceiveRequest.getId(), "đã có máu");
            return repository.save(bloodReceiveRequest);
        });
    }

    public Optional<BloodReceiveRequest> reject(Integer id, ChangeStatusDonationRequestDTO payload) throws IOException {
        return repository.findById(id).map(bloodReceiveRequest -> {
            if (bloodReceiveRequest.getTrangThai().equals(AppConfig.BLOOD_RECEIVE_REQUEST_COMPLETED)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only approve request when request is not completed");
            }

            Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = new User();
            user.setId(userId);
            bloodReceiveRequest.setTrangThai(AppConfig.BLOOD_RECEIVE_REQUEST_CANCEL);
            bloodReceiveRequest.setNguoiDuyet(user);
            bloodReceiveRequest.setFormKham(payload.getFormKham());
            bloodReceiveRequest.setNgayDuyet(LocalDateTime.now());
            if (payload.getGhiChu().isEmpty() || payload.getGhiChu() == "") {
                bloodReceiveRequest.setGhiChu("Admin rejected blood receive request");
            } else {
                bloodReceiveRequest.setGhiChu(payload.getGhiChu());
            }

            User userCreated = this.userRepository.findById(bloodReceiveRequest.getNguoiNhan().getId()).orElseThrow();
            SendEmail.changeBloodReceiveRequestStatus(userCreated.getEmail(), bloodReceiveRequest.getId(), "huỷ");
            return repository.save(bloodReceiveRequest);
        });
    }

    public Optional<BloodReceiveRequest> complete(Integer id, CompleteReceiveRequestDTO payload) throws IOException {
        return repository.findById(id).map(bloodReceiveRequest -> {
            if (!bloodReceiveRequest.getTrangThai().equals(AppConfig.BLOOD_RECEIVE_REQUEST_HAVE_BLOOD)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only ready request when request is completed");
            }

            Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = new User();
            user.setId(userId);
            bloodReceiveRequest.setTrangThai(AppConfig.BLOOD_RECEIVE_REQUEST_COMPLETED);
            bloodReceiveRequest.setNguoiDuyet(user);
            bloodReceiveRequest.setFormKham(payload.getFormKham());
            bloodReceiveRequest.setNgayDuyet(LocalDateTime.now());
            bloodReceiveRequest.setGhiChu("Admin completed blood receive request");

            List<BloodUnitWareHouse> listBloodUnitWareHouse = this.bloodUnitWareHouseRepository.findAllByYeuCauCanMau(bloodReceiveRequest);
            for (BloodUnitWareHouse bloodUnitWareHouse : listBloodUnitWareHouse) {
                bloodUnitWareHouse.setTrangThai(AppConfig.BLOOD_UNIT_WAREHOUSE_COMPLETED);
                this.bloodUnitWareHouseRepository.save(bloodUnitWareHouse);
            }

            User userCreated = this.userRepository.findById(bloodReceiveRequest.getNguoiNhan().getId()).orElseThrow();
            SendEmail.changeBloodReceiveRequestStatus(userCreated.getEmail(), bloodReceiveRequest.getId(), "đã hoàn thành");
            return repository.save(bloodReceiveRequest);
        });
    }

    public List<BloodUnitWareHouse> getListAvailableBloodUnitWareHouse(Integer id) {
        BloodReceiveRequest request = this.repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not existed request"));

        List<CompatibleBlood> listCompatibleBlood = this.compatibleBloodRepository.findAllByNhomMauHien(request.getNhomMau().getId());
        List<Integer> listBloodId = new ArrayList<>();
        for (CompatibleBlood compatibleBlood : listCompatibleBlood) {
            if (compatibleBlood.getTrangThai() == 1) {
                listBloodId.add(compatibleBlood.getNhomMauHien().getId());
            }
        }

        return this.bloodUnitWareHouseRepository.findListAvailableForReceive(listBloodId, LocalDateTime.now());
    }

    public List<BloodUnitWareHouse> getListBloodUnitUsed(Integer id) {
        System.out.println(id);
        BloodReceiveRequest request = this.repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not existed request"));

        return this.bloodUnitWareHouseRepository.findAllByYeuCauCanMau(request);
    }
}
