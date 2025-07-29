package org.fpt.blooddonate.controllers;

import org.fpt.blooddonate.models.CompatibleBlood;
import org.fpt.blooddonate.services.CompatibleBloodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/compatible-bloods")
public class CompatibleBloodController {
    @Autowired
    private CompatibleBloodService compatibleBloodService;

    @GetMapping
    public ResponseEntity<List<CompatibleBlood>> getAll(
            @RequestParam(required = false) int bloodId
    ) {
        return ResponseEntity.ok(compatibleBloodService.getAll(bloodId));
    }

    @GetMapping("/receive")
    public ResponseEntity<List<CompatibleBlood>> getAllReceive(
            @RequestParam(required = false) int bloodId
    ) {
        return ResponseEntity.ok(compatibleBloodService.getAllReceive(bloodId));
    }
}
