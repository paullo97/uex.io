import { PlusOne } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import StorageService from '../../../services/storageService';
import { useEffect, useState } from "react";

const ContactsList = ({ registerNewContact }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setContacts(StorageService.getContacts());
  }, [registerNewContact]);

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

      <div>
      {contacts.length ? (
        contacts.map((contact, index) => (
          <p key={index}>{contact.nome} - {contact.telefone}</p>
        ))
      ) : (
        <p>Nenhum contato encontrado.</p>
      )}
    </div>

    </div>
  );
};

export default ContactsList;
