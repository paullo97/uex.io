import { PlusOne } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import StorageService from '../../../services/storageService';
import { useEffect, useState } from "react";
import ItemContact from "../../../components/itemContact";
import { useAlert } from "../../../services/alertService";

const ContactsList = ({ registerNewContact }) => {
  const { showAlert } = useAlert();

  const [contacts, setContacts] = useState([]);
  const [ selectedItem, setSelectedItem ] = useState(null);

  useEffect(() => {
    setContacts(StorageService.getContacts());
  }, [registerNewContact]);

  const deleteItem = (itemIndex) => {
    StorageService.delteContact(itemIndex);
    showAlert('success', 'Contato Deletado com Sucesso');
    setContacts(StorageService.getContacts());
  }
  
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

      <div style={{ padding: '10px', display: 'flex', gap: '10px', flexDirection: 'column', overflowY: 'scroll', height: '89%' }}>
      {contacts.length ? (
        contacts.map((contact, index) => (
          <ItemContact 
            key={index} 
            name={contact.nome} 
            phone={contact.telefone} 
            onClick={() => setSelectedItem(index)} 
            selected={selectedItem === index}
            deleteItem={() => deleteItem(index)} />
        ))
      ) : (
        <p>Nenhum contato encontrado.</p>
      )}
    </div>

    </div>
  );
};

export default ContactsList;
