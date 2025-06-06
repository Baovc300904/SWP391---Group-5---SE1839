package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.entity.WebNotification;
import com.blooddonatesupport.fap.repository.WebNotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class WebNotificationController {

    private final WebNotificationRepository repository;

    @GetMapping("/my")
    public ResponseEntity<List<WebNotification>> getMyNotifications(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(repository.findByUser(user));
    }

    @PutMapping("/mark-read/{id}")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        WebNotification noti = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        noti.setRead(true);
        return ResponseEntity.ok(repository.save(noti));
    }
}

