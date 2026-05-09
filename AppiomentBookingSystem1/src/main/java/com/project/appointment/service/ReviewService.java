package com.project.appointment.service;

import com.project.appointment.entity.Review;
import com.project.appointment.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    // ✅ Add review
    public Review addReview(Review review) {
        if (review.getRating() < 1 || review.getRating() > 5) {
            throw new RuntimeException(
                "Rating must be between 1 and 5!");
        }
        return reviewRepository.save(review);
    }

    // ✅ Get all reviews
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // ✅ Get reviews by service
    public List<Review> getReviewsByService(Long serviceId) {
        return reviewRepository.findByServiceId(serviceId);
    }

    // ✅ Get reviews by user
    public List<Review> getReviewsByUser(Long userId) {
        return reviewRepository.findByUserId(userId);
    }

    // ✅ Delete review
    public String deleteReview(Long id) {
        reviewRepository.deleteById(id);
        return "Review deleted!";
    }

    // ✅ Get average rating for a service
    public double getAverageRating(Long serviceId) {
        List<Review> reviews =
            reviewRepository.findByServiceId(serviceId);
        if (reviews.isEmpty()) return 0.0;
        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }
}