package com.demobe.demobe.service;

import com.demobe.demobe.entity.User;

public interface NotificationService {
    void sendRecoveryReminder(User user, String message);
}

