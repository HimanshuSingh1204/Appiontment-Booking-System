import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingHistory() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('ALL');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId') || 1;
    const userName = localStorage.getItem('userName') || 'User';

    useEffect(() => {
        fetchMyAppointments();
    }, []);

    const fetchMyAppointments = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/appointments/user/${userId}`,
                { headers: {
                    Authorization: `Bearer ${token}` } }
            );
            console.log('My appointments:', response.data);
            setAppointments(response.data);
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to fetch appointments!');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'APPROVED':
                return { bg: '#e8f5e9', color: '#2e7d32',
                    border: '#2e7d32' };
            case 'CANCELLED':
                return { bg: '#ffebee', color: '#c62828',
                    border: '#c62828' };
            case 'BOOKED':
                return { bg: '#fff8e1', color: '#f57c00',
                    border: '#f57c00' };
            default:
                return { bg: '#f5f5f5', color: 'gray',
                    border: 'gray' };
        }
    };

    const getStatusEmoji = (status) => {
        switch (status) {
            case 'APPROVED': return '✅';
            case 'CANCELLED': return '❌';
            case 'BOOKED': return '⏳';
            default: return '📋';
        }
    };

    const filteredAppointments = filter === 'ALL'
        ? appointments
        : appointments.filter(a => a.status === filter);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                <h3 style={{ color: '#1565c0' }}>
                    Loading your appointments...
                </h3>
            </div>
        );
    }

    return (
        <div style={{
            paddingTop: '80px',
            padding: '80px 40px 40px',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
            }}>
                <div>
                    <h2 style={{ color: '#1565c0', margin: 0 }}>
                        📋 My Booking History
                    </h2>
                    <p style={{ color: 'gray', marginTop: '5px' }}>
                        Welcome, {userName}! Here are all your appointments.
                    </p>
                </div>
                <button
                    onClick={fetchMyAppointments}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#1565c0',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}>
                    🔄 Refresh
                </button>
            </div>

            {/* Stats */}
            <div style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '30px',
                flexWrap: 'wrap'
            }}>
                {[
                    { label: 'Total', value: appointments.length,
                        bg: '#1565c0' },
                    { label: 'Pending',
                        value: appointments.filter(
                            a => a.status === 'BOOKED').length,
                        bg: '#f57c00' },
                    { label: 'Approved',
                        value: appointments.filter(
                            a => a.status === 'APPROVED').length,
                        bg: '#2e7d32' },
                    { label: 'Cancelled',
                        value: appointments.filter(
                            a => a.status === 'CANCELLED').length,
                        bg: '#c62828' }
                ].map((stat) => (
                    <div key={stat.label} style={{
                        backgroundColor: stat.bg,
                        color: 'white',
                        padding: '20px 30px',
                        borderRadius: '15px',
                        textAlign: 'center',
                        minWidth: '120px'
                    }}>
                        <div style={{ fontSize: '28px',
                            fontWeight: 'bold' }}>
                            {stat.value}
                        </div>
                        <div style={{ fontSize: '14px' }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Buttons */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '25px',
                flexWrap: 'wrap'
            }}>
                {['ALL', 'BOOKED', 'APPROVED', 'CANCELLED']
                    .map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        style={{
                            padding: '8px 20px',
                            borderRadius: '20px',
                            border: '2px solid #1565c0',
                            backgroundColor: filter === status
                                ? '#1565c0' : 'white',
                            color: filter === status
                                ? 'white' : '#1565c0',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}>
                        {status === 'ALL' && '📋 All'}
                        {status === 'BOOKED' && '⏳ Pending'}
                        {status === 'APPROVED' && '✅ Approved'}
                        {status === 'CANCELLED' && '❌ Cancelled'}
                        {' '}({status === 'ALL'
                            ? appointments.length
                            : appointments.filter(
                                a => a.status === status).length})
                    </button>
                ))}
            </div>

            {error && (
                <div style={{
                    backgroundColor: '#ffebee',
                    color: 'red',
                    padding: '15px',
                    borderRadius: '10px',
                    marginBottom: '20px'
                }}>
                    {error}
                </div>
            )}

            {/* Appointments List */}
            {filteredAppointments.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '60px',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ fontSize: '60px' }}>📭</div>
                    <h3 style={{ color: 'gray' }}>
                        No appointments found
                    </h3>
                    <button
                        onClick={() =>
                            window.location.href = '/booking'}
                        style={{
                            padding: '12px 30px',
                            backgroundColor: '#1565c0',
                            color: 'white',
                            border: 'none',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            marginTop: '15px'
                        }}>
                        📅 Book Now
                    </button>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px'
                }}>
                    {filteredAppointments.map((apt) => {
                        const statusStyle =
                            getStatusColor(apt.status);
                        return (
                            <div key={apt.id} style={{
                                backgroundColor: 'white',
                                borderRadius: '15px',
                                padding: '25px',
                                boxShadow:
                                    '0 2px 8px rgba(0,0,0,0.1)',
                                border: `2px solid ${statusStyle.border}`,
                                transition: 'transform 0.2s'
                            }}
                            onMouseEnter={e =>
                                e.currentTarget.style.transform
                                    = 'translateY(-3px)'}
                            onMouseLeave={e =>
                                e.currentTarget.style.transform
                                    = 'translateY(0)'}>

                                {/* Status Badge */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '15px'
                                }}>
                                    <span style={{
                                        fontSize: '14px',
                                        color: 'gray'
                                    }}>
                                        Booking #{apt.id}
                                    </span>
                                    <span style={{
                                        backgroundColor:
                                            statusStyle.bg,
                                        color: statusStyle.color,
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontWeight: 'bold',
                                        fontSize: '13px'
                                    }}>
                                        {getStatusEmoji(apt.status)}
                                        {' '}{apt.status}
                                    </span>
                                </div>

                                {/* Service */}
                                <h3 style={{
                                    color: '#1565c0',
                                    margin: '0 0 15px 0'
                                }}>
                                    🏥 {apt.service?.name
                                        || 'Unknown Service'}
                                </h3>

                                {/* Details */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        color: '#555'
                                    }}>
                                        <span>📅</span>
                                        <span>
                                            <strong>Date:</strong>
                                            {' '}{apt.bookingDate}
                                        </span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        color: '#555'
                                    }}>
                                        <span>⏰</span>
                                        <span>
                                            <strong>Time:</strong>
                                            {' '}{apt.slot?.startTime
                                                || 'N/A'}
                                            {' - '}
                                            {apt.slot?.endTime
                                                || 'N/A'}
                                        </span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        color: '#555'
                                    }}>
                                        <span>💰</span>
                                        <span>
                                            <strong>Price:</strong>
                                            {' '}₹{apt.service?.price
                                                || 'N/A'}
                                        </span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        color: '#555'
                                    }}>
                                        <span>🕐</span>
                                        <span>
                                            <strong>Duration:</strong>
                                            {' '}{apt.service?.duration
                                                || 'N/A'} mins
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div style={{
                                    marginTop: '20px',
                                    display: 'flex',
                                    gap: '10px'
                                }}>
                                    {apt.status === 'APPROVED' && (
                                        <button
                                            onClick={() =>
                                                window.location.href
                                                    = '/reviews'}
                                            style={{
                                                flex: 1,
                                                padding: '10px',
                                                backgroundColor:
                                                    '#f57c00',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold'
                                            }}>
                                            ⭐ Write Review
                                        </button>
                                    )}
                                    {apt.status === 'BOOKED' && (
                                        <div style={{
                                            flex: 1,
                                            padding: '10px',
                                            backgroundColor:
                                                '#fff8e1',
                                            color: '#f57c00',
                                            borderRadius: '8px',
                                            textAlign: 'center',
                                            fontWeight: 'bold'
                                        }}>
                                            ⏳ Waiting for Approval
                                        </div>
                                    )}
                                    {apt.status === 'CANCELLED' && (
                                        <button
                                            onClick={() =>
                                                window.location.href
                                                    = '/booking'}
                                            style={{
                                                flex: 1,
                                                padding: '10px',
                                                backgroundColor:
                                                    '#1565c0',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold'
                                            }}>
                                            📅 Book Again
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default BookingHistory;