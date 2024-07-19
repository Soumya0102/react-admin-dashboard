// src/components/ThemeSwitcher.js
import { FormControlLabel, Switch } from '@mui/material';
import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <FormControlLabel
      control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
      label="Dark Mode"
    />
  );
};

export default ThemeSwitcher;
