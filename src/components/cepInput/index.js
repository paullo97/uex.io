import React, { useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import IMask from 'imask';
import { buscarPorCep } from '../../services/buscaCEP'; 

function CepInput({ name, value, onChange, onBlur, responseCEP }) {
  const inputRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const maskOptions = {
      mask: '00000-000',
    };

    const mask = IMask(inputRef.current, maskOptions);

    return () => {
      mask.destroy();
    };
  }, []);

  const handleCepChange = async (e) => {
    const cepValue = e.target.value;
    onChange(e);

    const cepValid = /^\d{5}-\d{3}$/.test(cepValue);
    
    if (cepValid) {
      setError(false);
      try {
        const data = await buscarPorCep(cepValue);
        responseCEP(data);
      } catch (error) {
        setError(true);
      }
    } else {
      setError(true);
    }
  }

  return (
    <div>
      <TextField
        label="CEP"
        inputRef={inputRef}
        variant="outlined"
        fullWidth
        name={name}
        value={value}
        onChange={handleCepChange}
        onBlur={onBlur}
        error={error}
        helperText={error ? "CEP inválido" : ""}
      />
    </div>
  );
}

export default CepInput;
