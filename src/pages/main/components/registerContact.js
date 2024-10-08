import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import PhoneInput from "../../../components/phoneInput";
import Row from "../../../components/row";
import HelperCEP from "./helperCEP";
import CpfInput from "../../../components/cpfInput";
import CepInput from "../../../components/cepInput";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const INITIAL_VALUES = {
  nome: "",
  cpf: "",
  telefone: "",
  endereco: {
    cep: "",
    uf: "",
    cidade: "",
    endereco: "",
    latitude: "",
    longitude: "",
  },
};

const RegisterContact = ({ open, handleClose, onRegister, onEditContact, onSaveEdit, setEditContact }) => {
  const [initialValues] = useState({ ...INITIAL_VALUES });
  const [helperCEP, setHelperCEP] = useState(false);

  const onSubmit = (values) => {
    if(!!onEditContact?.contact) {
      onSaveEdit(values);
    }
    else {
      onRegister(values);
    }
    setValues({ ...INITIAL_VALUES });
  };

  const { values, handleSubmit, handleChange, handleBlur, touched, errors, setValues } =
    useFormik({
      initialValues,
      onSubmit,
    });

  const handleHelperCEP = () => {
    setHelperCEP(true);
  };

  const responseCEP = (endereco) => {
    setValues((current) => ({ 
        ...current,
        endereco
    }))
  }

  const onClose = () => {
    setValues({ ...INITIAL_VALUES });
    setEditContact(null);
    handleClose();
  }

  useEffect(() => {
    if(!!onEditContact?.contact) {
      const { nome, cpf, telefone, endereco } = onEditContact.contact;
      console.log(telefone);
      setValues({
        nome,
        cpf,
        telefone,
        endereco,
      })
    }
  }, [onEditContact, setValues]);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Register new Contact
          </Typography>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "20px",
              }}
            >
              <Row>
                <TextField
                  type="nome"
                  label="Nome"
                  variant="outlined"
                  helperText={touched.nome && errors.nome}
                  error={touched.nome && Boolean(errors.nome)}
                  name="nome"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nome}
                />

                <CpfInput
                  name="cpf"
                  value={values.cpf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cpf && Boolean(errors.cpf)}
                />
              </Row>

              <Row>
                <CepInput
                    name="endereco.cep"
                    value={values.endereco?.cep}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.endereco?.cep && Boolean(errors.endereco?.cep)}
                    responseCEP={responseCEP}
                />

                <Button size="small" onClick={handleHelperCEP}>
                  Quero ajuda com CEP
                </Button>
              </Row>

              <PhoneInput
                name="telefone"
                value={values.telefone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.telefone && Boolean(errors.telefone)}
              />

              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px'}}>
                <Button variant="outlined" size="large" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained" size="large" type="submit">
                  Register
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
      <HelperCEP open={helperCEP} handleClose={(e) => {
        responseCEP(e);
        setHelperCEP(false);
      }} />
    </>
  );
};

export default RegisterContact;
