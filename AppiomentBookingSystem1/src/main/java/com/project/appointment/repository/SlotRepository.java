package com.project.appointment.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.project.appointment.entity.Slot;

public interface SlotRepository extends JpaRepository<Slot, Long> {
    List<Slot> findByServiceIdAndDateAndIsAvailableTrue(Long serviceId, LocalDate date);
}