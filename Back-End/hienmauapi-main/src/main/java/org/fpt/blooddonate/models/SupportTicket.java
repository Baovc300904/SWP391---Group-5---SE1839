package org.fpt.blooddonate.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "YeuCauLienHeHoTro")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupportTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne()
    @JoinColumn(name = "NguoiDungId", nullable = false)
    private User nguoiDung;

    @Column(name = "hoten", nullable = false, length = 255)
    private String hoTen;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(name = "sodienthoai", nullable = false, length = 20)
    private String soDienThoai;

    @Column(name = "tieude", nullable = false, length = 255)
    private String tieuDe;

    @Column(name = "noidung", nullable = false, columnDefinition = "TEXT")
    private String noiDung;

    @Column(name = "trangthai", nullable = false, columnDefinition = "ENUM('moi','dangxuly','hoanthanh','dahuy')")
    private String trangThai = "moi";

    @Column(name = "ngaytao", nullable = false)
    private LocalDateTime ngayTao;

    @Column(name = "ngaycapnhat", nullable = false)
    private LocalDateTime ngayCapNhat;

    @OneToMany(mappedBy = "supportTicket", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<SupportTicketHistory> histories;

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
