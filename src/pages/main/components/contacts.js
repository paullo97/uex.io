import { PlusOne, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import StorageService from '../../../services/storageService';
import { useEffect, useState } from "react";
import ItemContact from "../../../components/itemContact";
import { useAlert } from "../../../services/alertService";

const ContactsList = ({ registerNewContact, selectedItem, setSelectedItem, editItem }) => {
  const { showAlert } = useAlert();

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setContacts(StorageService.getContacts());
  }, [registerNewContact]);

  const deleteItem = (itemIndex) => {
    setSelectedItem(null);
    StorageService.deleteContact(itemIndex);
    showAlert('success', 'Contato Deletado com Sucesso');
    setContacts(StorageService.getContacts());
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      contact?.nome?.toLowerCase().includes(search.toLowerCase()) ||
      contact?.cpf?.replace(/[.-]/g, '').includes(search)
  );
  
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

      <div className="search" style={{ padding: '10px' }}>

        <TextField
          name="search"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              autoComplete: 'off'
            },
          }}
          sx={{ width: '100%' }}
        />
      </div>

      <div style={{ padding: '10px', display: 'flex', gap: '10px', flexDirection: 'column', overflowY: 'scroll', height: '79%' }}>
      {contacts.length ? (
        filteredContacts.sort((a, b) =>
          a.nome.toLowerCase().localeCompare(b.nome.toLowerCase())
        ).map((contact, index) => (
          <ItemContact 
            key={index} 
            name={contact.nome} 
            phone={contact.telefone} 
            onClick={() => setSelectedItem({
              index,
              contact
            })} 
            selected={(selectedItem?.index || 0) === index}
            deleteItem={() => deleteItem(index)}
            editItem={() => editItem({ index, contact })} />
        ))
      ) : (
        <p>No contacts found.</p>
      )}
    </div>

    </div>
  );
};

export default ContactsList;
