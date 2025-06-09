package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.entity.ActivityReport;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.repository.ActivityReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ActivityReportController {

    private final ActivityReportRepository repository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<List<ActivityReport>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ActivityReport> createReport(@RequestBody ActivityReport report,
                                                       @AuthenticationPrincipal User user) {
        report.setCreatedAt(LocalDateTime.now());
        report.setCreatedBy(user);
        return ResponseEntity.ok(repository.save(report));
    }
}
