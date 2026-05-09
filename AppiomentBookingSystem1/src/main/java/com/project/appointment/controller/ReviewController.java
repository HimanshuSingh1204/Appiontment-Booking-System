package com.project.appointment.controller;

import com.project.appointment.entity.Review;
import com.project.appointment.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // ✅ Add review
    @PostMapping("/add")
    public ResponseEntity<Review> addReview(
            @RequestBody Review review) {
        return ResponseEntity.ok(
            reviewService.addReview(review));
    }

    // ✅ Get all reviews
    @GetMapping("/all")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // ✅ Get reviews by service
    @GetMapping("/service/{serviceId}")
    public List<Review> getByService(
            @PathVariable Long serviceId) {
        return reviewService.getReviewsByService(serviceId);
    }

    // ✅ Get reviews by user
    @GetMapping("/user/{userId}")
    public List<Review> getByUser(
            @PathVariable Long userId) {
        return reviewService.getReviewsByUser(userId);
    }

    // ✅ Get average rating
    @GetMapping("/rating/{serviceId}")
    public ResponseEntity<Map<String, Object>> getAvgRating(
            @PathVariable Long serviceId) {
        double avg = reviewService.getAverageRating(serviceId);
        return ResponseEntity.ok(Map.of(
            "serviceId", serviceId,
            "averageRating", avg
        ));
    }

    // ✅ Delete review
    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Long id) {
        return reviewService.deleteReview(id);
    }
}