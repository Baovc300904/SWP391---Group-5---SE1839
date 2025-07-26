package org.fpt.blooddonate.repositories;

import org.fpt.blooddonate.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByTenDangNhap(String tenDangNhap);

    Optional<User> findByEmail(String email);

    boolean existsByTenDangNhap(String tenDangNhap);

    long countByVaiTro(String vaitro);

    boolean existsByEmail(String email);

    @Query("""
    SELECT b FROM User b
    WHERE (:role IS NULL OR b.vaiTro = :role)
      AND (:keyword IS NULL OR LOWER(b.ten) LIKE LOWER(CONCAT('%', :keyword, '%')))
    """)
    Page<User> paginated(
            @Param("role") String role,
            @Param("keyword") String keyword,
            Pageable pageable
    );

    @Query("""
        SELECT b
        FROM User b
        WHERE b.nhomMau.id IN :listBloodId
            AND (b.id != :myId)
    """)
    List<User> findListNearMe(
            @Param("listBloodId") List<Integer> listBloodId,
            @Param("myId") Integer myId
    );
}
