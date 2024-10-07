import React, { useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import IMask from 'imask';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

function CpfInput({ name, value, onChange, onBlur }) {
  const inputRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const maskOptions = {
      mask: '000.000.000-00',
    };

    const mask = IMask(inputRef.current, maskOptions);

    return () => {
      mask.destroy();
    };
  }, []);

  const handleCpfChange = (e) => {
    const cpfValue = e.target.value;
    onChange(e);

    if (cpfValidator.isValid(cpfValue)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <TextField
      label="CPF"
      inputRef={inputRef}
      variant="outlined"
      fullWidth
      name={name}
      value={value}
      onChange={handleCpfChange}
      onBlur={onBlur}
      error={error}
      helperText={error ? "CPF inválido" : ""}
    />
  );
}

export default CpfInput;
