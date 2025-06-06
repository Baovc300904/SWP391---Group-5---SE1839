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
        donation.setDonationDate(request.getDonationDate());
        donation.setLocation(request.getLocation());
        donation.setBloodGroup(request.getBloodGroup());
        donation.setUser(user);
        return donationRepo.save(donation);
    }

    public List<DonationRegistration> getMyDonations(User user) {
        return donationRepo.findByUser(user);
    }
}
