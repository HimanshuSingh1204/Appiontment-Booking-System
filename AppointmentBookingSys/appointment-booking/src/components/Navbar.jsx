import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <AppBar position="fixed" style={{
            backgroundColor: '#1565c0',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}>
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    style={{ cursor: 'pointer', letterSpacing: '1px' }}
                    onClick={() => navigate('/')}>
                    🏥 MediSalon Appointments
                </Typography>

                <Box display="flex" gap={1}>
                    {!token ? (
                        <>
                            <Button
                                variant="outlined"
                                style={{
                                    color: 'white',
                                    borderColor: 'white',
                                    borderRadius: '20px'
                                }}
                                onClick={() => navigate('/register')}>
                                Register
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: 'white',
                                    color: '#1565c0',
                                    borderRadius: '20px',
                                    fontWeight: 'bold'
                                }}
                                onClick={() => navigate('/login')}>
                                User Login
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#f50057',
                                    color: 'white',
                                    borderRadius: '20px',
                                    fontWeight: 'bold'
                                }}
                                onClick={() => navigate('/admin-login')}>
                                Admin Login
                            </Button>
                        </>
                    ) : (
                        <>
                            {role === 'ADMIN' && (
                                <Button
                                    style={{ color: 'white' }}
                                    onClick={() => navigate('/admin')}>
                                    Admin Panel
                                </Button>
                            )}
                            {role === 'USER' && (
                                <Button
                                    style={{ color: 'white' }}
                                    onClick={() => navigate('/dashboard')}>
                                    Dashboard
                                </Button>
                            )}
                            {role === 'USER' && (
    <>
        
        <Button style={{ color: 'white' }}
            onClick={() => navigate('/history')}>
            📋 My Bookings
        </Button>
    </>
)}
                            {role === 'USER' && (
                          <Button style={{ color: 'white' }}
                           onClick={() => navigate('/payment')}>
                                    💳 Pay & Book
                             </Button>
                   )}
                           {token && (
                            <Button style={{ color: 'white' }}
                            onClick={() => navigate('/reviews')}>
                                    ⭐ Reviews
                            </Button>
                             )}
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#f50057',
                                    borderRadius: '20px'
                                }}
                                onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;