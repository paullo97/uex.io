import React from 'react';
import { TextField } from '@mui/material';

function NumberInput({ min = 0, max = 100, label = '', name, value, onChange, onBlur, error }) {
  const handleChange = (e) => {
    const inputValue = parseFloat(e.target.value);
    
    const newValue = inputValue > max ? max : (inputValue < min ? min : inputValue);
    
    const syntheticEvent = {
      target: {
        name,
        value: newValue,
      },
    };
    
    onChange(syntheticEvent);
  };

  return (
    <TextField
      label={label}
      type="number"
      variant="outlined"
      onChange={handleChange}
      fullWidth
      name={name}
      value={value}
      onBlur={onBlur}
      error={!!error}
      helperText={error ? "Invalid age" : ""}
    />
  );
}

export default NumberInput;
