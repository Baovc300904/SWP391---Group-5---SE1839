package org.fpt.blooddonate.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "NhomMauTuongThich")
@Data
@NoArgsConstructor
public class CompatibleBlood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "NhomMauHienId", nullable = false)
    @JsonIgnoreProperties(value = {"danhSachHien", "danhSachNhan"})
    private Blood nhomMauHien;

    @ManyToOne
    @JoinColumn(name = "NhomMauNhanId", nullable = false)
    @JsonIgnoreProperties(value = {"danhSachHien", "danhSachNhan"})
    private Blood nhomMauNhan;

    private Integer trangThai = 1;

    private LocalDateTime ngayTao;

    private LocalDateTime ngayCapNhat;

    @PrePersist
    protected void onCreate() {
        ngayTao = ngayCapNhat = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        ngayCapNhat = LocalDateTime.now();
    }
}
