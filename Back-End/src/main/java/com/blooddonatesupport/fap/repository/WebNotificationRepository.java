package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.entity.WebNotification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WebNotificationRepository extends JpaRepository<WebNotification, Long> {
    List<WebNotification> findByUser(User user);
}
