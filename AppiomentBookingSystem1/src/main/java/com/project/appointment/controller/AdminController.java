package com.project.appointment.controller;

import com.project.appointment.entity.Appointment;
import com.project.appointment.entity.Slot;
import com.project.appointment.service.AdminService;
import com.project.appointment.service.SlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {

    @Autowired
    private SlotService slotService;

    @Autowired
    private AdminService adminService;

    // ✅ Add new slot
    @PostMapping("/slots")
    public Slot addSlot(@RequestBody Slot slot) {
        return slotService.addSlot(slot);
    }

    // ✅ Get all slots
    @GetMapping("/slots")
    public List<Slot> getAllSlots() {
        return slotService.getAllSlots();
    }

    // ✅ Get available slots by service and date
    @GetMapping("/slots/available")
    public List<Slot> getAvailableSlots(
            @RequestParam Long serviceId,
            @RequestParam String date) {
        return slotService.getAvailableSlots(
            serviceId, LocalDate.parse(date));
    }

    // ✅ Delete slot
    @DeleteMapping("/slots/{id}")
    public String deleteSlot(@PathVariable Long id) {
        return slotService.deleteSlot(id);
    }

    // ✅ Get all appointments — only ONE method
    @GetMapping("/appointments")
    public List<Appointment> getAllAppointments() {
        List<Appointment> list = adminService.getAllAppointments();
        System.out.println("Total appointments: " + list.size());
        return list;
    }

    // ✅ Approve appointment
    @PutMapping("/appointments/{id}/approve")
    public Appointment approveAppointment(@PathVariable Long id) {
        return adminService.approveAppointment(id);
    }

    // ✅ Cancel appointment
    @PutMapping("/appointments/{id}/cancel")
    public Appointment cancelAppointment(@PathVariable Long id) {
        return adminService.cancelAppointment(id);
    }
}