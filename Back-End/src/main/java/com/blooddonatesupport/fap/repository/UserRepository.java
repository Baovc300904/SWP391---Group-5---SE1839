package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.AccountStatus;
import com.blooddonatesupport.fap.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Fixed: Use proper field names
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);

    // For login - can use either email or username
    @Query("SELECT u FROM User u WHERE u.email = :credential OR u.username = :credential")
    Optional<User> findByEmailOrUsername(@Param("credential") String credential);

    // Additional useful methods
    Optional<User> findByEmailAndAccountStatus(String email, AccountStatus accountStatus);
    Optional<User> findByUsernameAndAccountStatus(String username, AccountStatus accountStatus);

    List<User> findByRole(String role);
    List<User> findByAccountStatus(AccountStatus accountStatus);

    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    long countByRole(@Param("role") String role);
}