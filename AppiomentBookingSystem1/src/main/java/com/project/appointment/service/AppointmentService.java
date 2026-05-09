package com.project.appointment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.appointment.entity.Appointment;
import com.project.appointment.entity.Slot;
import com.project.appointment.repository.AppointmentRepository;
import com.project.appointment.repository.SlotRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private EmailService emailService;

    public Appointment bookAppointment(Appointment appointment) {

        if (appointment == null) {
            throw new RuntimeException("Appointment request is empty");
        }

        if (appointment.getSlot() == null ||
                appointment.getSlot().getId() == null) {
            throw new RuntimeException("Slot ID is missing in request");
        }

        if (appointment.getUser() == null ||
                appointment.getUser().getId() == null) {
            throw new RuntimeException("User ID is missing");
        }

        if (appointment.getService() == null ||
                appointment.getService().getId() == null) {
            throw new RuntimeException("Service ID is missing");
        }

        Slot slot = slotRepository.findById(appointment.getSlot().getId())
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        if (!slot.getIsAvailable()) {
            throw new RuntimeException("Slot already booked");
        }

        slot.setIsAvailable(false);
        slotRepository.save(slot);

        appointment.setSlot(slot);
        appointment.setStatus("BOOKED");

        if (appointment.getBookingDate() == null) {
            appointment.setBookingDate(java.time.LocalDate.now());
        }

        Appointment saved = appointmentRepository.save(appointment);

        // ✅ Send confirmation email
        try {
            emailService.sendBookingConfirmation(
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
}