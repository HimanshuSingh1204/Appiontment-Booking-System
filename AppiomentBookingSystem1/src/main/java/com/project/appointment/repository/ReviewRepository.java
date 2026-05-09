package com.project.appointment.repository;

import com.project.appointment.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository
        extends JpaRepository<Review, Long> {

    // ✅ Get all reviews for a service
    List<Review> findByServiceId(Long serviceId);

    // ✅ Get all reviews by a user
    List<Review> findByUserId(Long userId);
}