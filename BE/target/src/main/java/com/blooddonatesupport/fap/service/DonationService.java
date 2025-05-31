package com.blooddonatesupport.fap.service;

import com.blooddonatesupport.fap.dto.DonationRegistrationRequest;
import com.blooddonatesupport.fap.entity.DonationRegistration;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.repository.DonationRegistrationRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service
public class DonationService {

    @Autowired
    private DonationRegistrationRepository donationRepo;

    public DonationRegistration registerDonation(DonationRegistrationRequest request, User user) {
        DonationRegistration donation = new DonationRegistration();
        donation.setNgayHien(request.getNgayHien());
        donation.setDiaDiem(request.getDiaDiem());
        donation.setNhomMau(request.getNhomMau());
        donation.setNguoiDung(user);
        return donationRepo.save(donation);
    }

    public List<DonationRegistration> getMyDonations(User user) {
        return donationRepo.findByNguoiDung_MaNguoiDung(user.getMaNguoiDung());
    }
}
