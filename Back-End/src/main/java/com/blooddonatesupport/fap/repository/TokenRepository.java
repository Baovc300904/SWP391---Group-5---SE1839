package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.ValidToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

@Repository
public interface TokenRepository extends JpaRepository<ValidToken, String> {

    @Modifying
    @Query("DELETE FROM ValidToken vt WHERE vt.user.userId = :userId")
    void deleteAllByUserUserId(@Param("userId") Integer userId);

    @Modifying
    @Query("DELETE FROM ValidToken vt WHERE vt.token = :token AND vt.user.userId = :userId")
    void deleteByTokenAndUserUserId(@Param("token") String token, @Param("userId") Integer userId);

    Optional<ValidToken> findByToken(String token);

    @Query("SELECT vt FROM ValidToken vt WHERE vt.user.userId = :userId")
    List<ValidToken> findAllByUserUserId(@Param("userId") Integer userId);

    @Modifying
    @Query("DELETE FROM ValidToken vt WHERE vt.expiryDate < :now")
    void deleteExpiredTokens(@Param("now") LocalDateTime now);

    boolean existsByToken(String token);
}
