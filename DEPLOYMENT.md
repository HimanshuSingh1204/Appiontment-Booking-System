# Full Stack Appointment Booking System - Deployment Guide

## Option 1: GitHub Pages + Railway (Recommended)

### Frontend (GitHub Pages)
Your frontend is already live at:
```
https://HimanshuSingh1204.github.io/Appiontment-Booking-System/
```

### Backend (Railway)
1. Go to https://railway.app
2. Create a new project
3. Connect your GitHub repo
4. Select the `AppiomentBookingSystem1` folder
5. Add environment variables:
   - `SPRING_DATASOURCE_URL=mysql://user:pass@host:3306/appointment_db`
   - `SPRING_DATASOURCE_USERNAME=root`
   - `SPRING_DATASOURCE_PASSWORD=password`
   - `SPRING_MAIL_USERNAME=your-email@gmail.com`
   - `SPRING_MAIL_PASSWORD=your-app-password`
   - `RAZORPAY_KEY_ID=your-razorpay-id`
   - `RAZORPAY_KEY_SECRET=your-razorpay-secret`
6. Deploy

Then update your frontend:
- Go to GitHub Pages settings
- Add the Railway backend URL to environment variables

---

## Option 2: Docker Compose (Local Development)

Run the entire stack locally:

```bash
cd AppointmentsBookingSystem
docker-compose up --build
```

Then access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- MySQL: localhost:3306

---

## Option 3: Heroku (Free Tier Alternative)

### Backend
1. Install Heroku CLI
2. `heroku login`
3. `heroku create your-app-name`
4. `heroku config:set SPRING_DATASOURCE_URL=...` (set all env vars)
5. `git push heroku main`

### Frontend
Already deployed to GitHub Pages.

---

## Project Links

- **Frontend (GitHub Pages)**: https://HimanshuSingh1204.github.io/Appiontment-Booking-System/
- **GitHub Repo**: https://github.com/HimanshuSingh1204/Appiontment-Booking-System
- **Backend**: Deploy on Railway/Heroku (get link after deployment)

