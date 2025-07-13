package org.fpt.blooddonate.utils;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import java.util.Properties;

public class SendEmail {
    public static void changeBloodDonationRequestStatus(String email, int id, String status) {
        final String username = "minhthienaap@gmail.com";
        final String password = "mjwn phlo jdjz oayc";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new jakarta.mail.Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(
                Message.RecipientType.TO,
                InternetAddress.parse("nguyensonghao974@gmail.com")
            );
            message.setSubject("Thay Đổi trạng thái của yêu cầu hiến máu");
            message.setText("Xin chào " + email + "\n. Yêu cầu hiến máu với mã #" + id + " đã được chuyển sang trạng thái " + status);
            Transport.send(message);
        } catch (MessagingException e) {
            System.out.println(e.getMessage());
        }
    }

    public static void changeBloodReceiveRequestStatus(String email, int id, String status) {
        final String username = "minhthienaap@gmail.com";
        final String password = "mjwn phlo jdjz oayc";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new jakarta.mail.Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse("nguyensonghao974@gmail.com")
            );
            message.setSubject("Thay Đổi trạng thái của yêu cầu nhận máu");
            message.setText("Xin chào " + email + "\n. Yêu cầu nhận máu với mã #" + id + " đã được chuyển sang trạng thái " + status);
            Transport.send(message);
        } catch (MessagingException e) {
            System.out.println(e.getMessage());
        }
    }
}
