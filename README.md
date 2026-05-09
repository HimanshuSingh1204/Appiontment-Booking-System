Appointment Booking System

A full stack Appointment Booking System built using React JS, Spring Boot, and MySQL. The application allows users to book appointments through available time slots, while admins can manage services, slots, and bookings efficiently.

🚀 Features
User appointment booking
Available time slot management
Admin dashboard
Appointment status management
REST API integration
MySQL database connectivity
Responsive frontend UI
Real-time booking workflow
🛠️ Tech Stack
Frontend
React JS
Axios
HTML5
CSS3
JavaScript
Backend
Spring Boot
Spring Data JPA
Spring Security
REST API
Database
MySQL
📂 Project Structure
appointment-booking-system
│
├── frontend
├── backend
└── database
⚙️ Installation
Backend Setup
cd backend
mvn clean install
mvn spring-boot:run
Frontend Setup
cd frontend
npm install
npm run dev
🗄️ Database Setup
Create MySQL database
Import database.sql
Update application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/appointment_db
spring.datasource.username=root
spring.datasource.password=yourpassword
🌐 API Testing

Use:

Postman
Thunder Client

Example endpoint:

POST /appointments/book
📸 Future Improvements
JWT Authentication
Email Notifications
SMS Alerts
Payment Gateway
Calendar Integration
Doctor/Salon Management
Online Video Consultation
👨‍💻 Author

Himanshu Singh

GitHub:
