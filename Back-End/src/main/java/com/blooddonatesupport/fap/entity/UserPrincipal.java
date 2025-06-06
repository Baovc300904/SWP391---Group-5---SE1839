package com.blooddonatesupport.fap.entity;

import com.blooddonatesupport.fap.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserPrincipal implements UserDetails {

    private final User user;

    public UserPrincipal(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase()));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail(); // Hoặc user.getUsername() nếu dùng username để login
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return !AccountStatus.Khoa.equals(user.getAccountStatus());
    }

    @Override
    public boolean isEnabled() {
        return AccountStatus.HoatDong.equals(user.getAccountStatus());
    }


    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


    public User getUser() {
        return user;
    }
}


