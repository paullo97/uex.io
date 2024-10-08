import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import '../styles.css';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

export const ConfirmDelete = ({ open, handleClose, verifyPassword }) => {
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div style={{ position: "relative", top: "-30px", left: "390px" }}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete Account
        </Typography>

        <b>
        To Confirm Deletion of your account, please enter your password
        below
        </b>

        <TextField
          type="password"
          name="new-password"
          id="new-password"
          variant="outlined"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
          slotProps={{
            input: {
                autoComplete: "new-password"
            },
            autoComplete: "new-password"

          }}
        />

        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <Button variant="outlined" size="large" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              verifyPassword(passwordConfirm);
              setPasswordConfirm('');
            }}
            color="error"
          >
            Delete
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
