// src/components/Calendar.js
import { Box, Button, Grid, TextField } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState([
    { title: 'Meeting', start: new Date(), end: new Date() },
  ]);

  const [formData, setFormData] = useState({ title: '', start: '', end: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        title: formData.title,
        start: new Date(formData.start),
        end: new Date(formData.end),
      },
    ]);
    setFormData({ title: '', start: '', end: '' });
  };

  return (
    <div>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              name="start"
              label="Start Date"
              type="datetime-local"
              value={formData.start}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              name="end"
              label="End Date"
              type="datetime-local"
              value={formData.end}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleAddEvent} sx={{ mt: 2 }}>
          Add Event
        </Button>
      </Box>
      <BigCalendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" />
    </div>
  );
};

export default Calendar;
