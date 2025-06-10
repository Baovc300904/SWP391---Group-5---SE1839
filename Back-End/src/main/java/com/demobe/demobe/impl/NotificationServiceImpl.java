package com.demobe.demobe.impl;

import com.demobe.demobe.entity.User;
import com.demobe.demobe.service.NotificationService;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Override
    public void sendRecoveryReminder(User user, String message) {
        // Giả lập gửi email
        System.out.println("🔔 Gửi nhắc nhở tới " + user.getEmail() + ": " + message);
    }
}
