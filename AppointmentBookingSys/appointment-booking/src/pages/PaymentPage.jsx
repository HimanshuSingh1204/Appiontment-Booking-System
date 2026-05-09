import React, { useState } from 'react';
import { Box, Typography, Paper, Card,
    CardContent, Grid, Button, Alert } from '@mui/material';

const services = [
    { id: 1, name: 'General Physician',
        price: 500, icon: '🩺', category: 'Doctor' },
    { id: 2, name: 'Dental Care',
        price: 800, icon: '🦷', category: 'Doctor' },
    { id: 3, name: 'Eye Checkup',
        price: 600, icon: '👁️', category: 'Doctor' },
    { id: 4, name: 'Hair Treatment',
        price: 400, icon: '💇', category: 'Salon' },
    { id: 5, name: 'Nail Art',
        price: 300, icon: '💅', category: 'Salon' },
    { id: 6, name: 'Facial & Skincare',
        price: 700, icon: '✨', category: 'Salon' }
];

function PaymentPage() {
    const [selectedService, setSelectedService] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentId, setPaymentId] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const handlePayment = async (service) => {
        setSelectedService(service);
        setError('');

        try {
            // Step 1 — Create order from backend
            const orderResponse = await fetch(
                'http://localhost:8080/payment/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount: service.price })
            });

            const orderData = await orderResponse.json();
            console.log('Order created:', orderData);

            // Step 2 — Open Razorpay popup
            const options = {
                key: orderData.keyId,
                amount: orderData.amount * 100,
                currency: 'INR',
                name: '🏥 MediSalon Appointments',
                description: service.name,
                order_id: orderData.orderId,
                handler: async function(response) {
                    console.log('Payment response:', response);

                    // Step 3 — Verify payment
                    const verifyResponse = await fetch(
                        'http://localhost:8080/payment/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            razorpay_order_id:
                                response.razorpay_order_id,
                            razorpay_payment_id:
                                response.razorpay_payment_id,
                            razorpay_signature:
                                response.razorpay_signature
                        })
                    });

                    const verifyData = await verifyResponse.json();

                    if (verifyData.status === 'success') {
                        setPaymentSuccess(true);
                        setPaymentId(verifyData.paymentId);
                    } else {
                        setError('Payment verification failed!');
                    }
                },
                prefill: {
                    name: 'User',
                    email: localStorage.getItem('email') || ''
                },
                theme: {
                    color: '#1565c0'
                },
                modal: {
                    ondismiss: function() {
                        setError('Payment cancelled!');
                    }
                }
            };

            // Load Razorpay script
            if (!window.Razorpay) {
                setError('Razorpay not loaded. Refresh and try again!');
                return;
            }

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error('Payment error:', err);
            setError('Payment failed. Try again!');
        }
    };

    return (
        <Box style={{
            paddingTop: '80px',
            padding: '80px 40px 40px',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh'
        }}>
            <Typography variant="h4" fontWeight="bold"
                color="#1565c0" gutterBottom>
                💳 Book & Pay
            </Typography>
            <Typography color="gray"
                style={{ marginBottom: '40px' }}>
                Select a service and pay securely via Razorpay
            </Typography>

            {paymentSuccess && (
                <Alert severity="success"
                    style={{ marginBottom: '20px',
                        borderRadius: '10px' }}>
                    🎉 Payment Successful! Payment ID: {paymentId}
                    — Your appointment is confirmed!
                </Alert>
            )}

            {error && (
                <Alert severity="error"
                    style={{ marginBottom: '20px',
                        borderRadius: '10px' }}>
                    {error}
                </Alert>
            )}

            {/* Doctor Services */}
            <Typography variant="h5" fontWeight="bold"
                style={{ marginBottom: '20px', color: '#1565c0' }}>
                🩺 Doctor Services
            </Typography>
            <Grid container spacing={3}
                style={{ marginBottom: '40px' }}>
                {services
                    .filter(s => s.category === 'Doctor')
                    .map((service) => (
                    <Grid item xs={12} sm={6} md={4}
                        key={service.id}>
                        <Card elevation={3} style={{
                            borderRadius: '15px',
                            border: selectedService?.id === service.id
                                ? '2px solid #1565c0'
                                : '2px solid transparent',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={e =>
                            e.currentTarget.style.transform =
                                'translateY(-5px)'}
                        onMouseLeave={e =>
                            e.currentTarget.style.transform =
                                'translateY(0)'}>
                            <CardContent style={{
                                textAlign: 'center',
                                padding: '30px'
                            }}>
                                <Typography variant="h2">
                                    {service.icon}
                                </Typography>
                                <Typography variant="h6"
                                    fontWeight="bold"
                                    style={{ margin: '10px 0' }}>
                                    {service.name}
                                </Typography>
                                <Typography variant="h5"
                                    fontWeight="bold"
                                    color="#1565c0"
                                    style={{ marginBottom: '20px' }}>
                                    ₹{service.price}
                                </Typography>
                                <Button fullWidth
                                    variant="contained"
                                    style={{
                                        backgroundColor: '#1565c0',
                                        borderRadius: '20px',
                                        padding: '10px'
                                    }}
                                    onClick={() =>
                                        handlePayment(service)}>
                                    💳 Pay & Book Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Salon Services */}
            <Typography variant="h5" fontWeight="bold"
                style={{ marginBottom: '20px', color: '#1565c0' }}>
                💇 Salon Services
            </Typography>
            <Grid container spacing={3}>
                {services
                    .filter(s => s.category === 'Salon')
                    .map((service) => (
                    <Grid item xs={12} sm={6} md={4}
                        key={service.id}>
                        <Card elevation={3} style={{
                            borderRadius: '15px',
                            border: selectedService?.id === service.id
                                ? '2px solid #1565c0'
                                : '2px solid transparent',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={e =>
                            e.currentTarget.style.transform =
                                'translateY(-5px)'}
                        onMouseLeave={e =>
                            e.currentTarget.style.transform =
                                'translateY(0)'}>
                            <CardContent style={{
                                textAlign: 'center',
                                padding: '30px'
                            }}>
                                <Typography variant="h2">
                                    {service.icon}
                                </Typography>
                                <Typography variant="h6"
                                    fontWeight="bold"
                                    style={{ margin: '10px 0' }}>
                                    {service.name}
                                </Typography>
                                <Typography variant="h5"
                                    fontWeight="bold"
                                    color="#1565c0"
                                    style={{ marginBottom: '20px' }}>
                                    ₹{service.price}
                                </Typography>
                                <Button fullWidth
                                    variant="contained"
                                    style={{
                                        backgroundColor: '#6a1b9a',
                                        borderRadius: '20px',
                                        padding: '10px'
                                    }}
                                    onClick={() =>
                                        handlePayment(service)}>
                                    💳 Pay & Book Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default PaymentPage;