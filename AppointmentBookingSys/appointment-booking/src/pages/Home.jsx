import React from 'react';
import { Box, Typography, Button, Grid, Card,
    CardContent, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const services = [
    {
        icon: '🩺',
        title: 'General Physician',
        description: 'Consult with experienced doctors for all general health issues.',
        price: '₹500',
        duration: '30 mins',
        category: 'Doctor'
    },
    {
        icon: '🦷',
        title: 'Dental Care',
        description: 'Complete dental checkup, cleaning and treatment services.',
        price: '₹800',
        duration: '45 mins',
        category: 'Doctor'
    },
    {
        icon: '👁️',
        title: 'Eye Checkup',
        description: 'Complete eye examination and vision correction consultation.',
        price: '₹600',
        duration: '30 mins',
        category: 'Doctor'
    },
    {
        icon: '💇',
        title: 'Hair Treatment',
        description: 'Premium hair care, styling and treatment by experts.',
        price: '₹400',
        duration: '60 mins',
        category: 'Salon'
    },
    {
        icon: '💅',
        title: 'Nail Art',
        description: 'Beautiful nail art and manicure/pedicure services.',
        price: '₹300',
        duration: '45 mins',
        category: 'Salon'
    },
    {
        icon: '✨',
        title: 'Facial & Skincare',
        description: 'Rejuvenating facial treatments for glowing healthy skin.',
        price: '₹700',
        duration: '60 mins',
        category: 'Salon'
    }
];

function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    return (
        <Box style={{ paddingTop: '64px' }}>

            {/* ✅ Hero Section with Video */}
            <Box style={{
                position: 'relative',
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Video Background */}
                <video
                    autoPlay
                    muted
                    loop
                    style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0
                    }}>
                    <source
                        src="https://www.w3schools.com/howto/rain.mp4"
                        type="video/mp4" />
                </video>

                {/* Dark overlay */}
                <Box style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(21, 101, 192, 0.75)',
                    zIndex: 1
                }} />

                {/* Hero Content */}
                <Box style={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    color: 'white',
                    padding: '20px'
                }}>
                    <Typography variant="h2" fontWeight="bold"
                        style={{ marginBottom: '20px',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                        🏥 MediSalon Appointments
                    </Typography>
                    <Typography variant="h5"
                        style={{ marginBottom: '30px', opacity: 0.9 }}>
                        Book Doctor & Salon appointments easily
                    </Typography>
                    <Typography variant="h6"
                        style={{ marginBottom: '40px', opacity: 0.8 }}>
                        ✅ Easy Booking &nbsp;&nbsp;
                        ✅ Expert Professionals &nbsp;&nbsp;
                        ✅ Instant Confirmation
                    </Typography>

                    <Box display="flex" gap={2}
                        justifyContent="center" flexWrap="wrap">
                        {!token ? (
                            <>
                                <Button
                                    variant="contained"
                                    size="large"
                                    style={{
                                        backgroundColor: 'white',
                                        color: '#1565c0',
                                        padding: '12px 40px',
                                        borderRadius: '30px',
                                        fontWeight: 'bold',
                                        fontSize: '16px'
                                    }}
                                    onClick={() => navigate('/register')}>
                                    Get Started 🚀
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    style={{
                                        color: 'white',
                                        borderColor: 'white',
                                        padding: '12px 40px',
                                        borderRadius: '30px',
                                        fontSize: '16px'
                                    }}
                                    onClick={() => {
                                        document.getElementById('services')
                                            .scrollIntoView({
                                                behavior: 'smooth'
                                            });
                                    }}>
                                    View Services 👇
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                size="large"
                                style={{
                                    backgroundColor: 'white',
                                    color: '#1565c0',
                                    padding: '12px 40px',
                                    borderRadius: '30px',
                                    fontWeight: 'bold',
                                    fontSize: '16px'
                                }}
                                onClick={() => navigate('/dashboard')}>
                                Go to Dashboard 📅
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>

            {/* ✅ Services Section */}
            <Box id="services" style={{
                padding: '80px 40px',
                backgroundColor: '#f8f9fa'
            }}>
                <Typography variant="h3" fontWeight="bold"
                    align="center" style={{
                        marginBottom: '10px',
                        color: '#1565c0'
                    }}>
                    Our Services
                </Typography>
                <Typography variant="h6" align="center"
                    color="gray" style={{ marginBottom: '50px' }}>
                    Professional Doctor & Salon services at your fingertips
                </Typography>

                {/* Doctor Services */}
                <Typography variant="h4" fontWeight="bold"
                    style={{ marginBottom: '20px', color: '#1565c0' }}>
                    🩺 Medical Services
                </Typography>
                <Grid container spacing={3}
                    style={{ marginBottom: '50px' }}>
                    {services
                        .filter(s => s.category === 'Doctor')
                        .map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card elevation={3} style={{
                                borderRadius: '15px',
                                height: '100%',
                                transition: 'transform 0.3s',
                                cursor: 'pointer',
                                border: '2px solid transparent'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.border = '2px solid #1565c0';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.border = '2px solid transparent';
                            }}>
                                <CardContent style={{ padding: '30px' }}>
                                    <Typography variant="h2"
                                        align="center">
                                        {service.icon}
                                    </Typography>
                                    <Typography variant="h6"
                                        fontWeight="bold" align="center"
                                        style={{ margin: '15px 0 10px' }}>
                                        {service.title}
                                    </Typography>
                                    <Typography color="gray"
                                        align="center"
                                        style={{ marginBottom: '15px' }}>
                                        {service.description}
                                    </Typography>
                                    <Box display="flex"
                                        justifyContent="center" gap={1}>
                                        <Chip label={service.price}
                                            color="primary" size="small" />
                                        <Chip label={service.duration}
                                            variant="outlined"
                                            size="small" />
                                    </Box>
                                    <Button fullWidth variant="contained"
                                        style={{
                                            marginTop: '15px',
                                            borderRadius: '20px',
                                            backgroundColor: '#1565c0'
                                        }}
                                        onClick={() => token ?
                                            navigate('/booking') :
                                            navigate('/login')}>
                                        {token ? 'Book Now' : 'Login to Book'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Salon Services */}
                <Typography variant="h4" fontWeight="bold"
                    style={{ marginBottom: '20px', color: '#1565c0' }}>
                    💇 Salon Services
                </Typography>
                <Grid container spacing={3}>
                    {services
                        .filter(s => s.category === 'Salon')
                        .map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card elevation={3} style={{
                                borderRadius: '15px',
                                height: '100%',
                                transition: 'transform 0.3s',
                                cursor: 'pointer',
                                border: '2px solid transparent'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.border = '2px solid #1565c0';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.border = '2px solid transparent';
                            }}>
                                <CardContent style={{ padding: '30px' }}>
                                    <Typography variant="h2"
                                        align="center">
                                        {service.icon}
                                    </Typography>
                                    <Typography variant="h6"
                                        fontWeight="bold" align="center"
                                        style={{ margin: '15px 0 10px' }}>
                                        {service.title}
                                    </Typography>
                                    <Typography color="gray"
                                        align="center"
                                        style={{ marginBottom: '15px' }}>
                                        {service.description}
                                    </Typography>
                                    <Box display="flex"
                                        justifyContent="center" gap={1}>
                                        <Chip label={service.price}
                                            color="primary" size="small" />
                                        <Chip label={service.duration}
                                            variant="outlined"
                                            size="small" />
                                    </Box>
                                    <Button fullWidth variant="contained"
                                        style={{
                                            marginTop: '15px',
                                            borderRadius: '20px',
                                            backgroundColor: '#1565c0'
                                        }}
                                        onClick={() => token ?
                                            navigate('/booking') :
                                            navigate('/login')}>
                                        {token ? 'Book Now' : 'Login to Book'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* ✅ Footer */}
            <Box style={{
                backgroundColor: '#1565c0',
                color: 'white',
                padding: '40px',
                textAlign: 'center'
            }}>
                <Typography variant="h6" fontWeight="bold">
                    🏥 MediSalon Appointments
                </Typography>
                <Typography style={{ marginTop: '10px', opacity: 0.8 }}>
                    © 2024 All rights reserved. |
                    Professional Doctor & Salon Services
                </Typography>
            </Box>
        </Box>
    );
}

export default Home;