package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.ValidToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<ValidToken, String> {
    void deleteAllByUserId(Long userId);
    void deleteByTokenAndUserId(String token, Long userId);

    Optional<ValidToken> findByToken(String token);
}
