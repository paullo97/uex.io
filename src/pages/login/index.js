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

const Login = () => {
    const { showAlert } = useAlert();
    const [ initialValues ] = useState({ ...INITIAL_VALUES });
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        senha: Yup.string().required('Password is required').min(5, 'Password Invalid'),
    });


    const onSubmit = (values) => {
        if (StorageService.validateUser(values.email, values.senha)) {
            showAlert('success', 'Login successful!');
            navigate('/main', { replace: true });
        } else {
            showAlert('error', 'Invalid email or password.');
        }
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

    const goRegister = () => {
        navigate('/');
    }

    return (
        <div className="container">
             <Container maxWidth="md" className='login'>
                <h1>LOGIN</h1>

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
                    <Button variant="contained" size="large" type="submit">Login</Button>
                </div>

                <small className='goRegister' onClick={goRegister}>Não tem conta? clique Aqui</small>
            </form>
             </Container>
        </div>
    )
}

export default Login;