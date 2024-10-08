import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { buscarPorEndereco } from "../../../services/buscaCEP"; // Usando OpenCage
import { Close } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const HelperCEP = ({ open, handleClose }) => {
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [enderecos, setEnderecos] = useState([]);
  const [error, setError] = useState(null);

  const handleBuscarRua = async () => {
    setError(null);
    if (!uf.length || !cidade.length || !rua.length) {
      setError("Preencha esses Campos para Realizar a busca");
      return;
    }
    try {
      const query = `${rua}, ${cidade}, ${uf}`;
      const data = await buscarPorEndereco(query);
      setEnderecos(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const onClose = (value) => {
    handleClose(value);
    setEnderecos([]);
    setError(null);
    setUf("");
    setCidade("");
    setRua("");
  };

  return (
    <Modal open={open} onClose={() => onClose()}>
      <Box sx={style}>
        <div style={{ position: "relative", top: "-30px", left: "950px" }}>
          <IconButton onClick={() => onClose()}>
            <Close />
          </IconButton>
        </div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        Help with ZIP Code
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div style={{ width: "100%" }}>
            <h2>Fill in the Address</h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <TextField
                variant="outlined"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                placeholder="UF (Ex: SP)"
              />
              <TextField
                variant="outlined"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Cidade"
              />
              <TextField
                variant="outlined"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                placeholder="Trecho da Rua"
              />
              <Button
                variant="contained"
                size="large"
                onClick={handleBuscarRua}
              >
                Buscar
              </Button>
            </div>

            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>

          {enderecos.length > 0 && (
            <div
              style={{ height: "300px", overflowY: "scroll", width: "100%" }}
            >
              <h2>Select Address</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "20px",
                  margin: "0 10px",
                }}
              >
                {enderecos.map((endereco, index) => (
                  <span
                    key={index}
                    onClick={() => onClose(endereco)}
                    style={{
                      border: "solid 1px black",
                      borderRadius: "5px",
                      padding: "10px",
                      cursor: "click",
                    }}
                  >
                    {`${endereco.endereco}, (Lat: ${endereco.latitude}, Lng: ${endereco.longitude})`}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default HelperCEP;
