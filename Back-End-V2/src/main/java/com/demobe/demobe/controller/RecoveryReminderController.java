package com.demobe.demobe.controller;

import com.demobe.demobe.service.RecoveryReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reminders")
public class RecoveryReminderController {

    @Autowired
    private RecoveryReminderService recoveryReminderService;

    @PostMapping("/check-recovery")
    public ResponseEntity<String> checkRecoveryManually() {
        recoveryReminderService.checkRecoveryAndNotify();
        return ResponseEntity.ok("Đã kiểm tra và gửi nhắc nhở (nếu có)");
    }
}

