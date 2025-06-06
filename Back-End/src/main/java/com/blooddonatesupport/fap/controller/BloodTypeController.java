package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.entity.BloodType;
import com.blooddonatesupport.fap.repository.BloodTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/blood-types")
@RequiredArgsConstructor
public class BloodTypeController {

    private final BloodTypeRepository repository;

    @GetMapping
    public ResponseEntity<List<BloodType>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }
}
