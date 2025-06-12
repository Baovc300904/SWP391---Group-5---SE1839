package com.demobe.demobe.scheduler;

import com.demobe.demobe.entity.DonationHistory;
import com.demobe.demobe.enums.DonationType;
import com.demobe.demobe.repository.DonationHistoryRepository;
import com.demobe.demobe.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RecoveryReminderScheduler {

    private final DonationHistoryRepository historyRepo;
    private final NotificationService notificationService;

    @Scheduled(cron = "0 0 8 * * *") // chạy mỗi ngày lúc 8h sáng
    public void checkRecoveryReminders() {
        List<DonationHistory> allHistories = historyRepo.findAll();

        Map<Integer, DonationHistory> latestByUser = allHistories.stream()
                .collect(Collectors.groupingBy(
                        h -> h.getNguoiDung().getId(),
                        Collectors.collectingAndThen(
                                Collectors.maxBy(Comparator.comparing(DonationHistory::getNgayHienThucTe)),
                                Optional::get
                        )
                ));

        for (Map.Entry<Integer, DonationHistory> entry : latestByUser.entrySet()) {
            DonationHistory latest = entry.getValue();
            LocalDate recoveryDate = calculateRecoveryDate(latest.getNgayHienThucTe(), latest.getLoaiHien());
            if (recoveryDate.equals(LocalDate.now())) {
                notificationService.sendRecoveryReminder(
                        latest.getNguoiDung(),
                        "Bạn đã có thể hiến máu trở lại! Hôm nay là ngày bạn đã hồi phục đủ để hiến máu lại."
                );

            }
        }
    }

    private LocalDate calculateRecoveryDate(LocalDate date, DonationType type) {
        return switch (type) {
            case Toan_Phan -> date.plusWeeks(8);
            case Hong_Cau -> date.plusWeeks(12);
            case Huyet_Tuong -> date.plusWeeks(2);
            case Tieu_Cau -> date.plusWeeks(4);
        };
    }
}
