package com.project.appointment.controller;

import com.project.appointment.entity.Appointment;
import com.project.appointment.repository.AppointmentRepository;
import com.project.appointment.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private AppointmentRepository appointmentRepository;

    // ✅ Book appointment
    @PostMapping("/book")
    public Appointment book(@RequestBody Appointment appointment) {
        return appointmentService.bookAppointment(appointment);
    }

    // ✅ Get appointments by user ID
    @GetMapping("/user/{userId}")
    public List<Appointment> getByUser(
            @PathVariable Long userId) {
        return appointmentRepository.findByUserId(userId);
    }
}