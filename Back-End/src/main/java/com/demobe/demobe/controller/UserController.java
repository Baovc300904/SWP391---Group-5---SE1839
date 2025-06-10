package com.demobe.demobe.controller;

import com.demobe.demobe.entity.User;
import com.demobe.demobe.repository.UserRepository;
import com.demobe.demobe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    //Sử dung api để tạo user Quan_Tri_Vien và Nhan_Vien
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User savedUser = userService.createUser(user);
        return ResponseEntity.ok(savedUser);
    }
}
