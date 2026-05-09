package com.project.appointment.controller;

import com.project.appointment.dto.AuthResponse;
import com.project.appointment.dto.LoginRequest;
import com.project.appointment.dto.RegisterRequest;
import com.project.appointment.entity.User;
import com.project.appointment.repository.UserRepository;
import com.project.appointment.security.JwtUtil;
import com.project.appointment.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {
    RequestMethod.GET,
    RequestMethod.POST,
    RequestMethod.PUT,
    RequestMethod.DELETE,
    RequestMethod.OPTIONS
})
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    // ✅ Handle preflight OPTIONS request
    @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions() {
        return ResponseEntity.ok().build();
    }

    // ✅ Test Email
    @GetMapping("/test-email")
    public String testEmail() {
        try {
            emailService.sendEmail(
                "himanshu.singh42005@gmail.com",
                "✅ Test Email from Appointment System",
                "Hello Himanshu!\n\nYour email configuration is working perfectly!\n\nRegards,\nAppointment System"
            );
            return "Email sent successfully!";
        } catch (Exception e) {
            return "Email failed: " + e.getMessage();
        }
    }

    // ✅ Register
    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body("Email already exists!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ?
                request.getRole() : "USER");

        userRepository.save(user);

        // ✅ Send welcome email after registration
        try {
            emailService.sendEmail(
                request.getEmail(),
                "🎉 Welcome to Appointment System!",
                "Dear " + request.getName() + ",\n\n"
                + "Welcome! You have successfully registered.\n\n"
                + "You can now login and book appointments.\n\n"
                + "Regards,\n"
                + "Appointment System Team"
            );
        } catch (Exception e) {
            System.out.println("Welcome email failed: " + e.getMessage());
        }

        return ResponseEntity.ok("User registered successfully!");
    }

    // ✅ Login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(
                user.getEmail(), user.getRole());

        return ResponseEntity.ok(
                new AuthResponse(token, user.getRole()));
    }
}