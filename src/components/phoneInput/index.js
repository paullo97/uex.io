import React, { useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import IMask from 'imask';

function PhoneInput({ name, value, onChange, onBlur, error }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const maskOptions = {
      mask: [
        {
          mask: '(00) 0000-0000',
          maxLength: 10,
        },
        {
          mask: '(00) 00000-0000',
          maxLength: 11,
        },
      ]
    };

    const mask = IMask(inputRef.current, maskOptions);

    return () => {
      mask.destroy();
    };
  }, []);

  return (
    <TextField
      label="Phone Number"
      inputRef={inputRef}
      variant="outlined"
      fullWidth
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={error ? "Invalid phone number" : ""}

    />
  );
}

export default PhoneInput;
