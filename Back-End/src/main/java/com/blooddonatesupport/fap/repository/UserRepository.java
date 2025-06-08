package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.entity.User.AccountStatus;
import com.blooddonatesupport.fap.entity.User.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.email = :credential OR u.username = :credential")
    Optional<User> findByEmailOrUsername(@Param("credential") String credential);

    // Using AccountStatus enum
    Optional<User> findByEmailAndAccountStatus(String email, AccountStatus accountStatus);

    Optional<User> findByUsernameAndAccountStatus(String username, AccountStatus accountStatus);

    List<User> findByAccountStatus(AccountStatus accountStatus);

    // Using Role enum
    List<User> findByRole(Role role);

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    long countByRole(@Param("role") Role role);

    // Validation methods
    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    // Additional methods with enum support
    @Query("SELECT u FROM User u WHERE u.accountStatus = :status AND u.role = :role")
    List<User> findByAccountStatusAndRole(@Param("status") AccountStatus status, @Param("role") Role role);

    // Find active users only
    @Query("SELECT u FROM User u WHERE u.accountStatus = 'Hoat_Dong'")
    List<User> findActiveUsers();

    // Find pending activation users
    @Query("SELECT u FROM User u WHERE u.accountStatus = 'Cho_Kich_Hoat'")
    List<User> findPendingUsers();

    // Find by blood group
    List<User> findByBloodGroupId(Integer bloodGroupId);

    // Complex query example
    @Query("SELECT u FROM User u WHERE u.bloodGroupId = :bloodGroupId AND u.accountStatus = 'Hoat_Dong' AND u.role = 'Thanh_Vien'")
    List<User> findActiveDonorsByBloodGroup(@Param("bloodGroupId") Integer bloodGroupId);
}