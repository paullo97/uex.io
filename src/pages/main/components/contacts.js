import { PlusOne } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

const ContactsList = ({ registerNewContact }) => {
  return (
    <div style={{ width: "50%", border: "solid black 1px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "solid black 2px",
          gap: "20px",
        }}
      >
        <h3>Contacts</h3>

        <Tooltip title="Register new Contact" arrow placement="top">
          <IconButton aria-label="register" color="primary" onClick={registerNewContact}>
            <PlusOne />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default ContactsList;
