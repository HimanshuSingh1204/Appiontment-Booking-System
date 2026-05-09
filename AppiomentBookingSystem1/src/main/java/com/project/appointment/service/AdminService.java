package com.project.appointment.service;

import com.project.appointment.entity.Appointment;
import com.project.appointment.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private EmailService emailService;

    // ✅ Get ALL appointments
    public List<Appointment> getAllAppointments() {
        List<Appointment> list = appointmentRepository.findAll();
        System.out.println("Total appointments found: "
            + list.size()); // ✅ Check in STS console
        return list;
    }

    // ✅ Approve appointment
    public Appointment approveAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Appointment not found"));
        appointment.setStatus("APPROVED");
        Appointment saved = appointmentRepository.save(appointment);
        try {
            emailService.sendApprovalEmail(
                saved.getUser().getEmail(),
                saved.getUser().getName(),
                saved.getService().getName(),
                saved.getBookingDate().toString(),
                saved.getSlot().getStartTime().toString()
            );
        } catch (Exception e) {
            System.out.println("Email failed: " + e.getMessage());
        }
        return saved;
    }

    // ✅ Cancel appointment
    public Appointment cancelAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Appointment not found"));
        appointment.setStatus("CANCELLED");
        Appointment saved = appointmentRepository.save(appointment);
        try {
            emailService.sendCancellationEmail(
                saved.getUser().getEmail(),
                saved.getUser().getName(),
                saved.getService().getName(),
                saved.getBookingDate().toString()
            );
        } catch (Exception e) {
            System.out.println("Email failed: " + e.getMessage());
        }
        return saved;
    }
}