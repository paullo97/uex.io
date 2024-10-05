import { Button, Container, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './styles.css';
import StorageService from '../../services/storageService';
import { useAlert } from '../../services/alertService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL_VALUES = {
    email: '',
    senha: ''
}

const RegisterForm = () => {
    const { showAlert } = useAlert();
    const [ initialValues, setInitialValues ] = useState({ ...INITIAL_VALUES });
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        senha: Yup.string().required('Password is required').min(5, 'Password Invalid'),
    });

    const onSubmit = (values) => {
        if (StorageService.userExists(values.email)) {
            showAlert('error', 'A user with this email already exists.');
            setInitialValues({ ...INITIAL_VALUES });
            return; 
        }

        StorageService.saveUser(values);
        showAlert('success', 'User registered successfully!');
        setInitialValues({ ...INITIAL_VALUES });
        goLogin();
    }

    const { 
      touched, 
      handleSubmit,  
      errors,
      handleChange, 
      handleBlur, 
      values 
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    const goLogin = () => {
        navigate('/login');
    }

    return (
        <div className='container'>
        <Container maxWidth="md" className='register'>
            <h1>CADASTRO</h1>

            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <TextField
                        type='email'
                        label="email"
                        variant="outlined"
                        helperText={touched.email && errors.email}
                        error={touched.email && Boolean(errors.email)}
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    <TextField
                        type='password'
                        label="senha"
                        variant="outlined"
                        helperText={touched.senha && errors.senha}
                        error={touched.senha && Boolean(errors.senha)}
                        name="senha"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.senha}
                    />
                </div>

                <div className='buttons'>
                    <Button variant="contained" size="large" type="submit">Register</Button>
                </div>

                <small className='goLogin' onClick={goLogin}>Já tem conta? clique Aqui</small>
            </form>
        </Container>
        </div>
    );
}

export default RegisterForm;
