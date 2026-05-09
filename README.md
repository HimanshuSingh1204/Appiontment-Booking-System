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
AppointmentsBookingSystem
│
├── AppiomentBookingSystem1   (Spring Boot backend)
├── AppointmentBookingSys/appointment-booking   (React frontend)
└── database.sql
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

## Live deployment
This repository is configured for automatic deployment with GitHub Actions.

### Backend (Railway)
- Push to `main` and Railway will build the backend from `AppiomentBookingSystem1`
- Add these GitHub Secrets:
  - `RAILWAY_API_KEY`
  - `RAILWAY_PROJECT_ID`
  - `RAILWAY_SERVICE_ID`
- The backend reads configuration from environment variables.

### Frontend (Vercel)
- Push to `main` and Vercel can build the frontend from `AppointmentBookingSys/appointment-booking`
- Add these GitHub Secrets:
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`
  - `REACT_APP_API_URL`

### Notes
- The app is ready to deploy live as soon as the above secrets are set.
- The `vercel.json` file is included for React production build routing.
- The `railway.json` file is included to help configure the Railway backend service.

GitHub:
