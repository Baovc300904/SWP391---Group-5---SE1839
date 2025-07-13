package org.fpt.blooddonate.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "ThongTinNhanVien")
@Data
@NoArgsConstructor
public class EmployeeInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "MaSoNhanVien", nullable = false, unique = true, length = 50)
    private String maSoNhanVien;

    @Column(name = "ChucVu", length = 100)
    private String chucVu;

    @Column(name = "PhongBan", length = 100)
    private String phongBan;

    @Column(name = "NgayVaoLam")
    private LocalDate ngayVaoLam;

    @Column(name = "TrangThaiLamViec")
    private String trangThaiLamViec;

    @OneToOne
    @JoinColumn(name = "NguoiDungId", unique = true, nullable = false)
    @JsonBackReference
    private User nguoiDung;

    @Column(name = "NgayTao", updatable = false)
    private LocalDateTime ngayTao = LocalDateTime.now();

    @Column(name = "NgayCapNhat")
    private LocalDateTime ngayCapNhat = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.ngayCapNhat = LocalDateTime.now();
    }
}
