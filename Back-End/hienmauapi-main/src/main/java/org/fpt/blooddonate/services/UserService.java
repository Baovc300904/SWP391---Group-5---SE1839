package org.fpt.blooddonate.services;
import org.fpt.blooddonate.configs.AppConfig;
import org.fpt.blooddonate.models.Blood;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.fpt.blooddonate.models.User;
import org.fpt.blooddonate.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Page<User> getAll(int page, String role, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, 20);
        return userRepository.paginated(role, keyword, pageable);
    }

    public Optional<User> getById(Integer id) {
        return userRepository.findById(id);
    }

    public Optional<User> delete(Integer id) {
        return userRepository.findById(id).map(user -> {
            user.setTrangThai(AppConfig.INACTIVE_STATUS);
            return userRepository.save(user);
        });
    }
}
