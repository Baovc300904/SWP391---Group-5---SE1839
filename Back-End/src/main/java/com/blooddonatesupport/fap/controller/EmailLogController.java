package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.entity.EmailLog;
import com.blooddonatesupport.fap.repository.EmailLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/email-logs")
@RequiredArgsConstructor
public class EmailLogController {

    private final EmailLogRepository repository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<EmailLog>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }
}
