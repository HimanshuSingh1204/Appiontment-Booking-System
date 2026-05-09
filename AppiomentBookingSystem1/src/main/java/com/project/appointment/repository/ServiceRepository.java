package com.project.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.appointment.entity.ServiceEntity;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
}