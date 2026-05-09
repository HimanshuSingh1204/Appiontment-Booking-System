package com.project.appointment.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.project.appointment.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUserId(Long userId);
}