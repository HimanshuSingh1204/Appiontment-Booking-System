package com.project.appointment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // ✅ Send simple email
    public void sendEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("himanshu.singh42005@gmail.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
        System.out.println("Email sent to: " + toEmail);
    }

    // ✅ Send booking confirmation email
    public void sendBookingConfirmation(String toEmail,
                                        String userName,
                                        String serviceName,
                                        String date,
                                        String startTime) {
        String subject = "✅ Appointment Booking Confirmed!";
        String body = "Dear " + userName + ",\n\n"
                + "Your appointment has been successfully booked!\n\n"
                + "📋 Booking Details:\n"
                + "Service  : " + serviceName + "\n"
                + "Date     : " + date + "\n"
                + "Time     : " + startTime + "\n"
                + "Status   : BOOKED\n\n"
                + "Thank you for using our Appointment System!\n\n"
                + "Regards,\n"
                + "Appointment System Team";

        sendEmail(toEmail, subject, body);
    }

    // ✅ Send cancellation email
    public void sendCancellationEmail(String toEmail,
                                       String userName,
                                       String serviceName,
                                       String date) {
        String subject = "❌ Appointment Cancelled";
        String body = "Dear " + userName + ",\n\n"
                + "Your appointment has been cancelled.\n\n"
                + "📋 Booking Details:\n"
                + "Service  : " + serviceName + "\n"
                + "Date     : " + date + "\n"
                + "Status   : CANCELLED\n\n"
                + "If you have any questions, please contact us.\n\n"
                + "Regards,\n"
                + "Appointment System Team";

        sendEmail(toEmail, subject, body);
    }

    // ✅ Send approval email
    public void sendApprovalEmail(String toEmail,
                                   String userName,
                                   String serviceName,
                                   String date,
                                   String startTime) {
        String subject = "🎉 Appointment Approved!";
        String body = "Dear " + userName + ",\n\n"
                + "Your appointment has been approved!\n\n"
                + "📋 Booking Details:\n"
                + "Service  : " + serviceName + "\n"
                + "Date     : " + date + "\n"
                + "Time     : " + startTime + "\n"
                + "Status   : APPROVED\n\n"
                + "Please arrive 10 minutes early.\n\n"
                + "Regards,\n"
                + "Appointment System Team";

        sendEmail(toEmail, subject, body);
    }
}