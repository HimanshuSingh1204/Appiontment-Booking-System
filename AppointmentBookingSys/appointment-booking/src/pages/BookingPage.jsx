import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import api from '../services/api';

const BookingPage = () => {
  const [serviceId, setServiceId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchSlots = async () => {
    if (!serviceId || !selectedDate) {
      setError('Please enter service ID and select a date');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Mock slots for testing - remove this when backend is available
      setAvailableSlots([
        { id: 1, startTime: '09:00', endTime: '10:00' },
        { id: 2, startTime: '10:00', endTime: '11:00' },
        { id: 3, startTime: '14:00', endTime: '15:00' },
      ]);

      // Uncomment below when backend is available
      // const dateStr = selectedDate.format('YYYY-MM-DD');
      // const response = await api.get(`/admin/slots/available?serviceId=${serviceId}&date=${dateStr}`);
      // setAvailableSlots(response.data);
    } catch (err) {
      setError('Failed to fetch available slots');
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot) {
      setError('Please select a slot');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Mock booking for testing - remove this when backend is available
      setSuccess('Appointment booked successfully!');
      setAvailableSlots([]);
      setSelectedSlot('');

      // Uncomment below when backend is available
      // const userId = 1; // This should come from JWT token
      // const bookingData = {
      //   user: { id: userId },
      //   service: { id: parseInt(serviceId) },
      //   slot: { id: parseInt(selectedSlot) },
      //   bookingDate: selectedDate.format('YYYY-MM-DD'),
      // };
      // await api.post('/appointments/book', bookingData);
      // setSuccess('Appointment booked successfully!');
      // setAvailableSlots([]);
      // setSelectedSlot('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Book Appointment
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Service ID"
              type="number"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              sx={{ mb: 2 }}
            />
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={setSelectedDate}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
              minDate={dayjs()}
            />
            <Button
              variant="outlined"
              onClick={handleFetchSlots}
              disabled={loading}
              sx={{ mb: 2 }}
            >
              Fetch Available Slots
            </Button>

            {availableSlots.length > 0 && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Select Slot</InputLabel>
                <Select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  label="Select Slot"
                >
                  {availableSlots.map((slot) => (
                    <MenuItem key={slot.id} value={slot.id}>
                      {slot.startTime} - {slot.endTime}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <Button
              variant="contained"
              onClick={handleBookAppointment}
              disabled={loading || !selectedSlot}
              fullWidth
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </Button>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default BookingPage;