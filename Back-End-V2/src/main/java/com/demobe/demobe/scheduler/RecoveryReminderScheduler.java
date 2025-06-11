package com.demobe.demobe.scheduler;

import com.demobe.demobe.entity.BloodDonationRequest;
import com.demobe.demobe.service.BloodDonationRequestService;
import com.demobe.demobe.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RecoveryReminderScheduler {

    private final BloodDonationRequestService requestService;
    private final NotificationService notificationService;

    // Lên lịch chạy lúc 9h sáng mỗi ngày
    @Scheduled(cron = "0 0 9 * * ?")
    public void sendDailyRecoveryReminders() {
        List<BloodDonationRequest> requests = requestService.findAllEligibleForRecoveryReminder();

        for (BloodDonationRequest request : requests) {
            String message = String.format(
                    "Chào %s, hôm nay bạn đã hồi phục và có thể đăng ký hiến máu mới!",
                    request.getRequester().getFullName()
            );
            notificationService.sendRecoveryReminder(request.getRequester(), message);
        }
    }
}
