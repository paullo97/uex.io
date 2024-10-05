import { createContext, useContext, useState } from 'react';
import AlertComponent from '../components/alert';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ visible: false, severity: 'success', message: '' });

    const showAlert = (severity, message) => {
        setAlert({ visible: true, severity, message });
    };

    const closeAlert = () => {
        setAlert({ ...alert, visible: false });
    };

    return (
        <AlertContext.Provider value={{ showAlert, closeAlert }}>
            {children}
            {alert.visible && (
                <AlertComponent 
                    severity={alert.severity} 
                    message={alert.message} 
                    onClose={closeAlert} 
                />
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    return useContext(AlertContext);
};
