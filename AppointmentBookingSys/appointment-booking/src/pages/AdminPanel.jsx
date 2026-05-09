import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody,
    TableCell, TableHead, TableRow, Button,
    TextField, Alert, Chip, Grid, Card,
    CardContent
} from '@mui/material';
import axios from 'axios';

function AdminPanel() {
    const [appointments, setAppointments] = useState([]);
    const [slots, setSlots] = useState([]);
    const [slot, setSlot] = useState({
        date: '', startTime: '', endTime: '',
        service: { id: '' }
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchAppointments();
        fetchSlots();
        // ✅ Auto refresh every 10 seconds
        const interval = setInterval(() => {
            fetchAppointments();
            fetchSlots();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:8080/admin/appointments',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Appointments:', response.data);
            setAppointments(response.data);
        } catch (err) {
            console.error('Failed to fetch:', err);
            setError('Failed to fetch appointments!');
        }
    };

    const fetchSlots = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:8080/admin/slots',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSlots(response.data);
        } catch (err) {
            console.error('Failed to fetch slots:', err);
        }
    };

    const handleAddSlot = async () => {
        try {
            await axios.post(
                'http://localhost:8080/admin/slots',
                slot,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Slot added successfully! ✅');
            setError('');
            setSlot({
                date: '', startTime: '', endTime: '',
                service: { id: '' }
            });
            fetchSlots();
        } catch (err) {
            setError('Failed to add slot!');
        }
    };

    const handleDeleteSlot = async (id) => {
        try {
            await axios.delete(
                `http://localhost:8080/admin/slots/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Slot deleted! ✅');
            fetchSlots();
        } catch (err) {
            setError('Failed to delete slot!');
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.put(
                `http://localhost:8080/admin/appointments/${id}/approve`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Appointment approved! ✅');
            fetchAppointments();
        } catch (err) {
            setError('Failed to approve!');
        }
    };

    const handleCancel = async (id) => {
        try {
            await axios.put(
                `http://localhost:8080/admin/appointments/${id}/cancel`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Appointment cancelled! ✅');
            fetchAppointments();
        } catch (err) {
            setError('Failed to cancel!');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'APPROVED': return 'success';
            case 'CANCELLED': return 'error';
            case 'BOOKED': return 'warning';
            default: return 'default';
        }
    };

    const bookedSlots = slots.filter(s => !s.isAvailable);
    const availableSlots = slots.filter(s => s.isAvailable);

    return (
        <Box style={{
            paddingTop: '80px',
            padding: '80px 30px 40px',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh'
        }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between"
                alignItems="center"
                style={{ marginBottom: '30px' }}>
                <Typography variant="h4" fontWeight="bold"
                    color="#1565c0">
                    🛠️ Admin Panel
                </Typography>
                <Button variant="outlined"
                    onClick={() => {
                        fetchAppointments();
                        fetchSlots();
                    }}
                    style={{ borderRadius: '20px' }}>
                    🔄 Refresh
                </Button>
            </Box>

            {success && (
                <Alert severity="success"
                    style={{ marginBottom: '15px',
                        borderRadius: '10px' }}
                    onClose={() => setSuccess('')}>
                    {success}
                </Alert>
            )}
            {error && (
                <Alert severity="error"
                    style={{ marginBottom: '15px',
                        borderRadius: '10px' }}
                    onClose={() => setError('')}>
                    {error}
                </Alert>
            )}

            {/* Stats Cards */}
            <Grid container spacing={3}
                style={{ marginBottom: '30px' }}>
                <Grid item xs={12} sm={3}>
                    <Card style={{
                        backgroundColor: '#1565c0',
                        color: 'white',
                        borderRadius: '15px'
                    }}>
                        <CardContent style={{
                            textAlign: 'center'
                        }}>
                            <Typography variant="h3"
                                fontWeight="bold">
                                {appointments.length}
                            </Typography>
                            <Typography>
                                Total Appointments
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card style={{
                        backgroundColor: '#f57c00',
                        color: 'white',
                        borderRadius: '15px'
                    }}>
                        <CardContent style={{
                            textAlign: 'center'
                        }}>
                            <Typography variant="h3"
                                fontWeight="bold">
                                {appointments.filter(
                                    a => a.status === 'BOOKED'
                                ).length}
                            </Typography>
                            <Typography>Pending</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card style={{
                        backgroundColor: '#2e7d32',
                        color: 'white',
                        borderRadius: '15px'
                    }}>
                        <CardContent style={{
                            textAlign: 'center'
                        }}>
                            <Typography variant="h3"
                                fontWeight="bold">
                                {appointments.filter(
                                    a => a.status === 'APPROVED'
                                ).length}
                            </Typography>
                            <Typography>Approved</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card style={{
                        backgroundColor: '#c62828',
                        color: 'white',
                        borderRadius: '15px'
                    }}>
                        <CardContent style={{
                            textAlign: 'center'
                        }}>
                            <Typography variant="h3"
                                fontWeight="bold">
                                {appointments.filter(
                                    a => a.status === 'CANCELLED'
                                ).length}
                            </Typography>
                            <Typography>Cancelled</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Add Slot Section */}
            <Paper elevation={3} style={{
                padding: '30px',
                marginBottom: '30px',
                borderRadius: '15px'
            }}>
                <Typography variant="h6" fontWeight="bold"
                    color="#1565c0"
                    style={{ marginBottom: '20px' }}>
                    ➕ Add New Slot
                </Typography>
                <Box display="flex" gap={2} flexWrap="wrap"
                    alignItems="center">
                    <TextField label="Service ID" type="number"
                        value={slot.service.id}
                        onChange={(e) => setSlot({
                            ...slot,
                            service: { id: e.target.value }
                        })}
                        size="small"
                        style={{ width: '130px' }} />

                    <TextField label="Date" type="date"
                        value={slot.date}
                        onChange={(e) => setSlot({
                            ...slot, date: e.target.value
                        })}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        style={{ width: '170px' }} />

                    <TextField label="Start Time" type="time"
                        value={slot.startTime}
                        onChange={(e) => setSlot({
                            ...slot, startTime: e.target.value
                        })}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        style={{ width: '150px' }} />

                    <TextField label="End Time" type="time"
                        value={slot.endTime}
                        onChange={(e) => setSlot({
                            ...slot, endTime: e.target.value
                        })}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        style={{ width: '150px' }} />

                    <Button variant="contained"
                        onClick={handleAddSlot}
                        style={{
                            backgroundColor: '#1565c0',
                            borderRadius: '8px',
                            padding: '8px 25px'
                        }}>
                        ADD SLOT
                    </Button>
                </Box>
            </Paper>

            {/* Slots Overview */}
            <Grid container spacing={3}
                style={{ marginBottom: '30px' }}>

                {/* Available Slots */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{
                        padding: '20px',
                        borderRadius: '15px'
                    }}>
                        <Typography variant="h6"
                            fontWeight="bold"
                            style={{ color: '#2e7d32',
                                marginBottom: '15px' }}>
                            ✅ Available Slots
                            ({availableSlots.length})
                        </Typography>
                        {availableSlots.length === 0 ? (
                            <Typography color="gray"
                                align="center">
                                No available slots
                            </Typography>
                        ) : (
                            availableSlots.map((s) => (
                                <Box key={s.id}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    style={{
                                        padding: '10px',
                                        marginBottom: '8px',
                                        backgroundColor: '#f0fff0',
                                        borderRadius: '8px',
                                        border: '1px solid #2e7d32'
                                    }}>
                                    <Box>
                                        <Typography
                                            fontWeight="bold"
                                            fontSize="14px">
                                            📅 {s.date}
                                        </Typography>
                                        <Typography
                                            color="gray"
                                            fontSize="12px">
                                            ⏰ {s.startTime}
                                            - {s.endTime}
                                        </Typography>
                                    </Box>
                                    <Button size="small"
                                        color="error"
                                        variant="outlined"
                                        onClick={() =>
                                            handleDeleteSlot(s.id)}>
                                        Delete
                                    </Button>
                                </Box>
                            ))
                        )}
                    </Paper>
                </Grid>

                {/* Booked Slots */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{
                        padding: '20px',
                        borderRadius: '15px'
                    }}>
                        <Typography variant="h6"
                            fontWeight="bold"
                            style={{ color: '#f50057',
                                marginBottom: '15px' }}>
                            🔴 Booked Slots
                            ({bookedSlots.length})
                        </Typography>
                        {bookedSlots.length === 0 ? (
                            <Typography color="gray"
                                align="center">
                                No booked slots
                            </Typography>
                        ) : (
                            bookedSlots.map((s) => (
                                <Box key={s.id}
                                    style={{
                                        padding: '10px',
                                        marginBottom: '8px',
                                        backgroundColor: '#fff8f8',
                                        borderRadius: '8px',
                                        border: '1px solid #f50057'
                                    }}>
                                    <Typography
                                        fontWeight="bold"
                                        fontSize="14px">
                                        📅 {s.date}
                                    </Typography>
                                    <Typography
                                        color="gray"
                                        fontSize="12px">
                                        ⏰ {s.startTime}
                                        - {s.endTime}
                                    </Typography>
                                </Box>
                            ))
                        )}
                    </Paper>
                </Grid>
            </Grid>

            {/* Appointments Table */}
            <Paper elevation={3} style={{
                padding: '30px',
                borderRadius: '15px'
            }}>
                <Box display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ marginBottom: '20px' }}>
                    <Typography variant="h6" fontWeight="bold"
                        color="#1565c0">
                        📋 All Appointments
                        ({appointments.length})
                    </Typography>
                    <Button size="small" variant="outlined"
                        onClick={fetchAppointments}
                        style={{ borderRadius: '20px' }}>
                        🔄 Refresh
                    </Button>
                </Box>

                {appointments.length === 0 ? (
                    <Box style={{ textAlign: 'center',
                        padding: '40px' }}>
                        <Typography color="gray">
                            No appointments found
                        </Typography>
                    </Box>
                ) : (
                    <Box style={{ overflowX: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{
                                    backgroundColor: '#1565c0'
                                }}>
                                    {['ID', 'User', 'Email',
                                        'Service', 'Date',
                                        'Time', 'Status',
                                        'Actions'].map((h) => (
                                        <TableCell key={h}
                                            style={{
                                                color: 'white',
                                                fontWeight: 'bold'
                                            }}>
                                            {h}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointments.map((apt) => (
                                    <TableRow key={apt.id}
                                        style={{
                                            backgroundColor:
                                                apt.status ===
                                                'CANCELLED'
                                                ? '#fff8f8' :
                                                apt.status ===
                                                'APPROVED'
                                                ? '#f0fff0'
                                                : 'white'
                                        }}>
                                        <TableCell>
                                            {apt.id}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontWeight: 'bold'
                                            }}>
                                            {apt.user?.name
                                                || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {apt.user?.email
                                                || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {apt.service?.name
                                                || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {apt.bookingDate}
                                        </TableCell>
                                        <TableCell>
                                            {apt.slot?.startTime
                                                || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={apt.status}
                                                color={getStatusColor(
                                                    apt.status)}
                                                size="small"
                                                style={{
                                                    fontWeight:
                                                        'bold'
                                                }} />
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex"
                                                gap={1}>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() =>
                                                        handleApprove(
                                                            apt.id)}
                                                    disabled={
                                                        apt.status
                                                        === 'APPROVED'
                                                    }>
                                                    ✅ Approve
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() =>
                                                        handleCancel(
                                                            apt.id)}
                                                    disabled={
                                                        apt.status
                                                        === 'CANCELLED'
                                                    }>
                                                    ❌ Cancel
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}

export default AdminPanel;