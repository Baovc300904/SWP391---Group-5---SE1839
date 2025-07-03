package org.fpt.blooddonate.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "BaiViet")
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tieude", nullable = false, columnDefinition = "TEXT")
    private String tieuDe;

    @Column(name = "anh", nullable = false, length = 255)
    private String anh;

    @ManyToOne
    @JoinColumn(name = "DanhMucId", nullable = false)
    private BlogCategory danhMuc;

    @Column(name = "noidung", nullable = false, columnDefinition = "TEXT")
    private String noiDung;

    @Column(name = "luotxem", nullable = false)
    private Integer luotXem = 0;

    @Column(name = "nguoitao", nullable = false)
    private Integer nguoiTao;

    @Column(name = "trangthai", nullable = false)
    private Integer trangThai = 1; // 0: inactive, 1: active

    @Column(name = "ngaytao", nullable = false)
    private LocalDateTime ngayTao = LocalDateTime.now();

    @Column(name = "ngaycapnhat", nullable = false)
    private LocalDateTime ngayCapNhat = LocalDateTime.now();

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
