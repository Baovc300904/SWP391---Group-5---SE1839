package com.blooddonatesupport.fap.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    
    private final JavaMailSender mailSender;

    @Retryable(value = {Exception.class}, maxAttempts = 3, backoff = @Backoff(delay = 1000))
    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            message.setFrom("noreply@blooddonation.com");
            
            mailSender.send(message);
            log.info("Email sent successfully to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage(), e);
            throw new RuntimeException("Lỗi gửi email", e);
        }
    }

    public void sendBloodRequestNotification(String userEmail, String bloodType, int quantity) {
        String subject = "Yêu cầu hiến máu khẩn cấp";
        String body = String.format("Chúng tôi cần %d đơn vị máu nhóm %s. Vui lòng liên hệ nếu bạn có thể hỗ trợ.", 
                                   quantity, bloodType);
        sendEmail(userEmail, subject, body);
    }
}