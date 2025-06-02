package com.blooddonatesupport.fap.entity;

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
        return List.of(new SimpleGrantedAuthority("ROLE_" + user.getVaiTro()));
    }

    @Override
    public String getPassword() {
        return user.getMatKhauHash();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    // Các method khác như isAccountNonExpired, isAccountNonLocked... return true
}

