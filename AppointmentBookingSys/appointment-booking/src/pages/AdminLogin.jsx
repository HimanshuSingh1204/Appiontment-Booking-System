import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper } from '@mui/material';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        axios({
            method: 'POST',
            url: 'http://localhost:8080/auth/login',
            data: { email, password },
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
            if (response.data.role !== 'ADMIN') {
                setError('Access denied! Admin only.');
                return;
            }
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            window.location.href = '/admin';
        })
        .catch(() => {
            setError('Invalid admin credentials!');
        });
    };

    return (
        <Box display="flex" justifyContent="center"
            alignItems="center" minHeight="100vh"
            style={{ backgroundColor: '#1565c0', paddingTop: '64px' }}>
            <Paper elevation={10} style={{
                padding: '50px',
                width: '420px',
                borderRadius: '20px'
            }}>
                <Typography variant="h4" align="center"
                    fontWeight="bold" color="#1565c0"
                    style={{ marginBottom: '10px' }}>
                    🔐 Admin Login
                </Typography>
                <Typography align="center" color="gray"
                    style={{ marginBottom: '30px' }}>
                    Restricted access — Admins only
                </Typography>

                {error && (
                    <div style={{
                        backgroundColor: '#ffebee',
                        color: 'red',
                        padding: '10px',
                        borderRadius: '8px',
                        marginBottom: '15px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold',
                        color: '#1565c0' }}>
                        Admin Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@gmail.com"
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginTop: '8px',
                            border: '2px solid #1565c0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label style={{ fontWeight: 'bold',
                        color: '#1565c0' }}>
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter admin password"
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginTop: '8px',
                            border: '2px solid #1565c0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <button onClick={handleLogin} style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: '#f50057',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>
                    🔐 Admin Sign In
                </button>

                <button
                    onClick={() => window.location.href = '/'}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginTop: '10px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#1565c0',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}>
                    ← Back to Home
                </button>
            </Paper>
        </Box>
    );
}

export default AdminLogin;