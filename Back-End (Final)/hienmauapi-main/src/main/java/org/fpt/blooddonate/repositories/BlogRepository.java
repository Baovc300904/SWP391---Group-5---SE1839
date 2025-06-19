package org.fpt.blooddonate.repositories;

import org.fpt.blooddonate.models.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {
    @Query("""
    SELECT b FROM Blog b
    WHERE (:categoryId IS NULL OR b.danhMuc.id = :categoryId)
      AND (:keyword IS NULL OR LOWER(b.tieuDe) LIKE LOWER(CONCAT('%', :keyword, '%')))
          AND (:status IS NULL OR b.trangThai = :status)
    """)
    Page<Blog> paginated(
        @Param("categoryId") Integer categoryId,
        @Param("status") Integer status,
        @Param("keyword") String keyword,
        Pageable pageable
    );

}