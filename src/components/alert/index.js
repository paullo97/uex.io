import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

const AlertComponent = ({ severity, message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  const getIcon = () => {
    switch (severity) {
      case 'success':
        return <CheckIcon fontSize="inherit" />;
      case 'error':
        return <ErrorIcon fontSize="inherit" />;
      case 'info':
        return <InfoIcon fontSize="inherit" />;
      case 'warning':
        return <WarningIcon fontSize="inherit" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <Alert icon={getIcon()} severity={severity} style={{
        position: 'absolute',
        top: '5%',
        left: '40vw',
        padding: '5px 50px'
    }}>
      {message}
    </Alert>
  );
};

export default AlertComponent;
