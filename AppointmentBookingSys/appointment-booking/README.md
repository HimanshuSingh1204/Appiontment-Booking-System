# Appointment Booking System

A React.js frontend for an appointment booking system with Material UI.

## Features

- User authentication (Login/Register)
- Dashboard for users
- Appointment booking with date picker and slot selection
- Admin panel for managing slots and appointments
- Protected routes based on user roles
- Responsive Material UI design

## Tech Stack

- React.js
- Material UI (@mui/material)
- Axios for API calls
- React Router DOM for navigation
- Day.js for date handling

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Mock Login Credentials

For testing purposes, the app includes mock authentication. Use these credentials:

### Admin Login:
- Email: `admin@example.com`
- Password: `admin`

### User Login:
- Email: `user@example.com`
- Password: `user`

## API Integration

The app is configured to work with a backend API at `http://localhost:8080`. The API endpoints are:

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Appointments
- `POST /appointments/book` - Book an appointment
- `GET /appointments/user/{id}` - Get user's appointments

### Admin
- `POST /admin/slots` - Add a new slot
- `GET /admin/slots` - Get all slots
- `GET /admin/slots/available?serviceId={id}&date={date}` - Get available slots
- `DELETE /admin/slots/{id}` - Delete a slot
- `GET /admin/appointments` - Get all appointments
- `PUT /admin/appointments/{id}/approve` - Approve appointment
- `PUT /admin/appointments/{id}/cancel` - Cancel appointment

## Project Structure

```
src/
├── components/
│   └── Navbar.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── BookingPage.jsx
│   └── AdminPanel.jsx
├── services/
│   └── api.js
├── App.js
└── index.js
```

## Backend Setup

To connect to a real backend, uncomment the API calls in the components and comment out the mock implementations. Make sure your backend supports CORS for `http://localhost:3000`.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
