package com.secretary.secretaryapp.email;

import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendMail(String toEmail, String subject, String message) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            mailMessage.setTo(toEmail);
            mailMessage.setSubject(subject);
            mailMessage.setText(message);

            mailMessage.setFrom("no.reply.secretary.app@gmail.com");

            javaMailSender.send(mailMessage);
        }catch (Exception e)
        {
            throw new MailSendException(e.getMessage());
        }
    }
}
