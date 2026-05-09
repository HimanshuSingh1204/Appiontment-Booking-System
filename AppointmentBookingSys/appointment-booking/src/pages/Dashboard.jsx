import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent,
    Chip, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

function Dashboard() {
    const [bookedSlots, setBookedSlots] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/admin/slots',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const all = response.data;
            setBookedSlots(all.filter(s => !s.isAvailable));
            setAvailableSlots(all.filter(s => s.isAvailable));
        } catch (err) {
            console.error('Error fetching slots:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center"
                alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box style={{ paddingTop: '80px', padding: '80px 40px 40px' }}>

            <Typography variant="h4" fontWeight="bold"
                color="#1565c0" gutterBottom>
                📅 My Dashboard
            </Typography>
            <Typography color="gray" style={{ marginBottom: '40px' }}>
                View all available and booked appointment slots
            </Typography>

            {/* Quick Actions */}
            <Box display="flex" gap={2}
                style={{ marginBottom: '40px' }}>
                <Button variant="contained"
                    style={{
                        backgroundColor: '#1565c0',
                        borderRadius: '20px',
                        padding: '10px 30px'
                    }}
                    onClick={() => window.location.href = '/booking'}>
                    📅 Book New Appointment
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3}
                style={{ marginBottom: '40px' }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card style={{
                        backgroundColor: '#1565c0',
                        color: 'white',
                        borderRadius: '15px'
                    }}>
                        <CardContent style={{ textAlign: 'center' }}>
                            <Typography variant="h3" fontWeight="bold">
                                {availableSlots.length}
                            </Typography>
                            <Typography variant="h6">
                                Available Slots
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card style={{
                        backgroundColor: '#f50057',
                        color: 'white',
                        borderRadius: '15px'
                    }}>
                        <CardContent style={{ textAlign: 'center' }}>
                            <Typography variant="h3" fontWeight="bold">
                                {bookedSlots.length}
                            </Typography>
                            <Typography variant="h6">
                                Booked Slots
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card style={{
                        backgroundColor: '#2e7d32',
                        color: 'white',
                        borderRadius: '15px'
                    }}>
                        <CardContent style={{ textAlign: 'center' }}>
                            <Typography variant="h3" fontWeight="bold">
                                🩺
                            </Typography>
                            <Typography variant="h6">
                                Doctor Services
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card style={{
                        backgroundColor: '#6a1b9a',
                        color: 'white',
                        borderRadius: '15px'
                    }}>
                        <CardContent style={{ textAlign: 'center' }}>
                            <Typography variant="h3" fontWeight="bold">
                                💇
                            </Typography>
                            <Typography variant="h6">
                                Salon Services
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Available Slots */}
            <Typography variant="h5" fontWeight="bold"
                style={{ marginBottom: '20px', color: '#2e7d32' }}>
                ✅ Available Slots ({availableSlots.length})
            </Typography>
            <Grid container spacing={2}
                style={{ marginBottom: '40px' }}>
                {availableSlots.length === 0 ? (
                    <Grid item xs={12}>
                        <Card style={{ borderRadius: '15px' }}>
                            <CardContent style={{ textAlign: 'center',
                                padding: '30px' }}>
                                <Typography color="gray">
                                    No available slots right now
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ) : (
                    availableSlots.map((slot) => (
                        <Grid item xs={12} sm={6} md={4} key={slot.id}>
                            <Card style={{
                                borderRadius: '15px',
                                border: '2px solid #2e7d32',
                                transition: 'transform 0.2s'
                            }}
                            onMouseEnter={e =>
                                e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={e =>
                                e.currentTarget.style.transform = 'translateY(0)'}>
                                <CardContent>
                                    <Box display="flex"
                                        justifyContent="space-between"
                                        alignItems="center">
                                        <Typography fontWeight="bold"
                                            color="#1565c0">
                                            📅 {slot.date}
                                        </Typography>
                                        <Chip label="Available"
                                            size="small"
                                            style={{
                                                backgroundColor: '#e8f5e9',
                                                color: '#2e7d32',
                                                fontWeight: 'bold'
                                            }} />
                                    </Box>
                                    <Typography color="gray"
                                        style={{ marginTop: '8px' }}>
                                        ⏰ {slot.startTime} - {slot.endTime}
                                    </Typography>
                                    <Typography color="gray"
                                        style={{ marginTop: '4px' }}>
                                        🏥 Service ID: {slot.service?.id}
                                    </Typography>
                                    <Button fullWidth variant="contained"
                                        size="small"
                                        style={{
                                            marginTop: '12px',
                                            backgroundColor: '#1565c0',
                                            borderRadius: '20px'
                                        }}
                                        onClick={() =>
                                            window.location.href = '/booking'}>
                                        Book This Slot
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>

            {/* Booked Slots */}
            <Typography variant="h5" fontWeight="bold"
                style={{ marginBottom: '20px', color: '#f50057' }}>
                🔴 Booked Slots ({bookedSlots.length})
            </Typography>
            <Grid container spacing={2}>
                {bookedSlots.length === 0 ? (
                    <Grid item xs={12}>
                        <Card style={{ borderRadius: '15px' }}>
                            <CardContent style={{ textAlign: 'center',
                                padding: '30px' }}>
                                <Typography color="gray">
                                    No booked slots yet
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ) : (
                    bookedSlots.map((slot) => (
                        <Grid item xs={12} sm={6} md={4} key={slot.id}>
                            <Card style={{
                                borderRadius: '15px',
                                border: '2px solid #f50057',
                                backgroundColor: '#fff8f8'
                            }}>
                                <CardContent>
                                    <Box display="flex"
                                        justifyContent="space-between"
                                        alignItems="center">
                                        <Typography fontWeight="bold"
                                            color="#1565c0">
                                            📅 {slot.date}
                                        </Typography>
                                        <Chip label="Booked"
                                            size="small"
                                            style={{
                                                backgroundColor: '#ffebee',
                                                color: '#f50057',
                                                fontWeight: 'bold'
                                            }} />
                                    </Box>
                                    <Typography color="gray"
                                        style={{ marginTop: '8px' }}>
                                        ⏰ {slot.startTime} - {slot.endTime}
                                    </Typography>
                                    <Typography color="gray"
                                        style={{ marginTop: '4px' }}>
                                        🏥 Service ID: {slot.service?.id}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
}

export default Dashboard;