package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "YeuCauLienHeHoTro")
public class SupportRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaYeuCau")
    private Integer requestId;

    @ManyToOne
    @JoinColumn(name = "MaNguoiDungGuiYeuCau", referencedColumnName = "MaNguoiDung")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "MaNguoiXuLyYeuCau", referencedColumnName = "MaNguoiDung")
    private User handler;

    @Column(name = "TieuDe")
    private String title;

    @Column(name = "NoiDung")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai")
    private SupportStatus status;

    @Column(name = "ThoiGianTao")
    private LocalDateTime createdAt;

    public enum SupportStatus {
        Moi, Dang_Xu_Ly, Da_Hoan_Thanh, Da_Huy
    }

    // Getters and Setters
    public Integer getRequestId() {
        return requestId;
    }

    public void setRequestId(Integer requestId) {
        this.requestId = requestId;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getHandler() {
        return handler;
    }

    public void setHandler(User handler) {
        this.handler = handler;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public SupportStatus getStatus() {
        return status;
    }

    public void setStatus(SupportStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
