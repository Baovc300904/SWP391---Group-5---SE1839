package org.fpt.blooddonate.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "LichSuLienHeHoTro")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupportTicketHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HoTroId")
    @JsonBackReference
    private SupportTicket supportTicket;

    @ManyToOne
    @JoinColumn(name = "NguoiHoTroId", nullable = false)
    private User supporter;

    @Column(name = "ghichu", nullable = false, columnDefinition = "TEXT")
    private String ghiChu;

    @Column(name = "trangthai", nullable = false, columnDefinition = "ENUM('moi','dangxuly','hoanthanh','dahuy')")
    private String trangThai = "moi";

    @Column(name = "ngaytao", nullable = false)
    private LocalDateTime ngayTao;

    @Column(name = "ngaycapnhat", nullable = false)
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
