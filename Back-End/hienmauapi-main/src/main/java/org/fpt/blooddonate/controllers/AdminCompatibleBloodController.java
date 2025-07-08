package org.fpt.blooddonate.controllers;

import jakarta.validation.Valid;
import org.fpt.blooddonate.dtos.requests.CreateCompatibleBloodDTO;
import org.fpt.blooddonate.services.CompatibleBloodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin/compatible-bloods")
public class AdminCompatibleBloodController {
    @Autowired
    private CompatibleBloodService compatibleBloodService;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CreateCompatibleBloodDTO payload) throws IOException {
        return ResponseEntity.ok(compatibleBloodService.create(payload));
    }
}
