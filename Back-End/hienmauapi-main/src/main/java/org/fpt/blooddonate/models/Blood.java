package org.fpt.blooddonate.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "NhomMau")
@Data
@NoArgsConstructor
public class Blood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 255)
    private String ten;

    @Column(columnDefinition = "TEXT")
    private String mota;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 1", length = 1)
    private Integer trangThai = 1;

    @Column(name = "NgayTao", updatable = false)
    private LocalDateTime ngayTao;

    @Column(name = "NgayCapNhat")
    private LocalDateTime ngayCapNhat;

    @PrePersist
    protected void onCreate() {
        this.ngayTao = LocalDateTime.now();
        this.ngayCapNhat = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.ngayCapNhat = LocalDateTime.now();
    }
}
