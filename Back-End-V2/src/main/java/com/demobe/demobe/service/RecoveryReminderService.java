package com.demobe.demobe.service;

import com.demobe.demobe.entity.DonationHistory;
import com.demobe.demobe.entity.User;
import com.demobe.demobe.repository.DonationHistoryRepository;
import com.demobe.demobe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.demobe.demobe.enums.DonationType;

import java.time.LocalDate;
import java.util.List;

@Service
public class RecoveryReminderService {

    @Autowired
    private DonationHistoryRepository donationHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService; // dịch vụ gửi email hoặc push notification

    public void checkRecoveryAndNotify() {
        List<User> users = userRepository.findAll();

        for (User user : users) {
            List<DonationHistory> histories = donationHistoryRepository.findRecentByUserId(user.getId());
            if (histories.isEmpty()) continue;

            DonationHistory latest = histories.get(0); // giả sử lịch sử đã sắp theo DESC
            LocalDate lastDate = latest.getNgayHienThucTe();

            int recoveryDays = switch (latest.getLoaiHien()) {
                case Toan_Phan -> 90;
                case Tieu_Cau -> 14;
                case Huyet_Tuong -> 28;
                case Hong_Cau -> 56;
                default -> 90;
            };

            LocalDate nextEligibleDate = lastDate.plusDays(recoveryDays);
            LocalDate now = LocalDate.now();

            if (!now.isBefore(nextEligibleDate)) {
                String message = String.format(
                        "Chào %s,\n\nBạn có thể hiến máu %s tiếp theo từ ngày %s.\nHãy giữ gìn sức khỏe và chuẩn bị sẵn sàng!",
                        user.getFullName(),
                        latest.getLoaiHien().name().replace("_", " "),
                        nextEligibleDate
                );
                notificationService.sendRecoveryReminder(user, message);
            }
        }
    }
}

