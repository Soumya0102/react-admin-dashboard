// src/App.js
import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { ThemeContextProvider } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

const App = () => {
  return (
    <ThemeContextProvider>
      <Router>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeContextProvider>
  );
};

export default App;
