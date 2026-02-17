package com.vinayak.project_management_system.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService{

    @Autowired
    private JavaMailSender javaMailSender;
    @Override
    public void sendEmailWithToken(String userEmail, String link) throws Exception{
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,"utf-8");

        String subject = "Project Team Invitation";
        String text = "Hello, Hope you are fine and doing well ; I have wonderful opportunity to you, Click the below given link to join the project team " + link;
        helper.setSubject(subject);
        helper.setText(text);
        helper.setTo(userEmail);

        try{
            javaMailSender.send(mimeMessage);

        } catch (MailSendException e) {
            throw new MailSendException("Failed to send Email");
        }

    }
}
