import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        console.log('Button clicked!');
        console.log('Email:', email);
        console.log('Password:', password);

        axios({
            method: 'POST',
            url: 'http://localhost:8080/auth/login',
            data: {
                email: email,
                password: password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log('Success:', response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);

            if (response.data.role === 'ADMIN') {
                window.location.href = '/admin';
            } else {
                window.location.href = '/dashboard';
            }
        })
        .catch((err) => {
            console.error('Error:', err);
            setError('Invalid email or password!');
        });
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                width: '400px'
            }}>
                <h2 style={{ textAlign: 'center' }}>🔐 Sign In</h2>

                {error && (
                    <div style={{
                        backgroundColor: '#ffebee',
                        color: 'red',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '15px'
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ marginBottom: '15px' }}>
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Enter email"
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Enter password"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#1976d2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}>
                    SIGN IN
                </button>

                <button
                    onClick={() => window.location.href = '/register'}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginTop: '10px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#1976d2',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}>
                    Don't have an account? Sign Up
                </button>
            </div>
        </div>
    );
}

export default Login;