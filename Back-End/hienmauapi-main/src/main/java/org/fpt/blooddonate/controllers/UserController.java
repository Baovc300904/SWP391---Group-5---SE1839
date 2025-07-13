package org.fpt.blooddonate.controllers;

import jakarta.validation.Valid;
import org.fpt.blooddonate.dtos.requests.CreateEmployeeRequestDTO;
import org.fpt.blooddonate.models.User;
import org.fpt.blooddonate.services.EmployeeService;
import org.fpt.blooddonate.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<Page<User>> getAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String keyword
    ) {
        return ResponseEntity.ok(userService.getAll(page, role, keyword));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        Optional<User> result = userService.getById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.status(404).body("Not found user");
        }
    }

    @GetMapping("/near-me")
    public ResponseEntity<?> getListNearMe() {
        return ResponseEntity.ok(userService.getListNearMe());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        return userService.delete(id)
            .<ResponseEntity<?>>map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(404).body("Not found user"));
    }

    @PostMapping("/employee")
    public ResponseEntity<User> createEmployee(@Valid @RequestBody CreateEmployeeRequestDTO payload) {
        return ResponseEntity.ok(this.employeeService.create(payload));
    }
}
