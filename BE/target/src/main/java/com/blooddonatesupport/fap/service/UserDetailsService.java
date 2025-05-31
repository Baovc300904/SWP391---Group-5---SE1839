package com.blooddonatesupport.fap.service;

import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.entity.UserPrincipal;
import com.blooddonatesupport.fap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));

        return new UserPrincipal(user); // Đây là chỗ dùng getAuthorities()
    }
}
