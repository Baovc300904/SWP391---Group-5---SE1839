package com.blooddonatesupport.fap.security;

import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) {
        OAuth2User user = new DefaultOAuth2UserService().loadUser(request);
        String email = user.getAttribute("email");
        String name = user.getAttribute("name");
        String provider = request.getClientRegistration().getRegistrationId();

        userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setHoVaTen(name);
            newUser.setVaiTro("USER");
            newUser.setProvider(provider);
            newUser.setNgayDangKy(LocalDateTime.now());
            return userRepository.save(newUser);
        });

        return user;
    }
}
