import React, { useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import IMask from 'imask';

function PhoneInput({ name, value, onChange, onBlur, error }) {
  const inputRef = useRef(null);
  const [maskedValue, setMaskedValue] = useState(value);

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

    mask.on('accept', () => {
      const unmaskedValue = mask.unmaskedValue;
      setMaskedValue(mask.value);
      onChange({ target: { name, value: unmaskedValue } });
    });

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
      value={maskedValue}
      onBlur={(e) => {
        setMaskedValue(maskedValue);
        onBlur(e);
      }}
      error={error}
      helperText={error ? "Invalid phone number" : ""}

    />
  );
}

export default PhoneInput;
