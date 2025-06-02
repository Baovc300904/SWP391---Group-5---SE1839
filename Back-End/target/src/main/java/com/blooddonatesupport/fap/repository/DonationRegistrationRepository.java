package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.DonationRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DonationRegistrationRepository extends JpaRepository<DonationRegistration, Long> {
    List<DonationRegistration> findByNguoiDung_MaNguoiDung(Long maNguoiDung);
}

