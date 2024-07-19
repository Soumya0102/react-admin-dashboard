// src/components/Charts.js
import { Box, Button, TextField } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const [labels, setLabels] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July']);
  const [dataPoints, setDataPoints] = useState([65, 59, 80, 81, 56, 55, 40]);

  const [formData, setFormData] = useState({ label: '', dataPoint: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddDataPoint = () => {
    setLabels([...labels, formData.label]);
    setDataPoints([...dataPoints, parseFloat(formData.dataPoint)]);
    setFormData({ label: '', dataPoint: '' });
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Sales',
        data: dataPoints,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div>
      <Box mb={2}>
        <TextField
          name="label"
          label="Label"
          value={formData.label}
          onChange={handleChange}
          sx={{ mr: 2 }}
        />
        <TextField
          name="dataPoint"
          label="Data Point"
          type="number"
          value={formData.dataPoint}
          onChange={handleChange}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleAddDataPoint}>
          Add Data Point
        </Button>
      </Box>
      <Line data={data} />
    </div>
  );
};

export default Charts;
