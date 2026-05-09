package com.project.appointment.service;

import com.project.appointment.entity.Slot;
import com.project.appointment.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SlotService {

    @Autowired
    private SlotRepository slotRepository;

    // ✅ Add new slot
    public Slot addSlot(Slot slot) {
        slot.setIsAvailable(true);
        return slotRepository.save(slot);
    }

    // ✅ Get available slots by service and date
    public List<Slot> getAvailableSlots(Long serviceId, LocalDate date) {
        return slotRepository.findByServiceIdAndDateAndIsAvailableTrue(serviceId, date);
    }

    // ✅ Get all slots
    public List<Slot> getAllSlots() {
        return slotRepository.findAll();
    }

    // ✅ Delete slot
    public String deleteSlot(Long slotId) {
        slotRepository.deleteById(slotId);
        return "Slot deleted successfully!";
    }
}