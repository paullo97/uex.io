import { useState } from "react";
import ContactsList from "./components/contacts";
import "./styles.css";
import RegisterContact from "./components/registerContact";
import StorageService from '../../services/storageService';
import { useAlert } from "../../services/alertService";
import ShowMap from "./components/showMap";

const MainForm = () => {
  const { showAlert } = useAlert();

  const [registerContact, setRegistercontact] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemEdit, setItemEdit] = useState(null);

  const registerNewContact = () => {
    setRegistercontact(true);
  }

  const handleRegisterNewContact = (contact) => {    
    setRegistercontact(false);
    const result = StorageService.addContactToUser(contact);
    showAlert(
      result ? 'success' : 'error', 
      result ? 'Contato Adicionado com Sucesso' : 'Contato de CPF já existente na Lista'
    );
  }

  const editItem = (contact) => {
    setItemEdit(contact);
    setRegistercontact(true);
  }

  const onSaveEdit = (contactEdit) => {
    setRegistercontact(false);
    console.log(contactEdit);
    StorageService.editContact(contactEdit.index, contactEdit.contact )
  }

  return (
    <>
      <div className="main-content">
        <ContactsList 
          registerNewContact={registerNewContact} 
          selectedItem={selectedItem} 
          setSelectedItem={(contact) => setSelectedItem(contact)} 
          editItem={editItem} 
        />
        <ShowMap 
          latitude={selectedItem?.contact.endereco.latitude}
          longitude={selectedItem?.contact.endereco.longitude}
          marcadores={[
            {
              latitude: selectedItem?.contact.endereco.latitude || 0,
              longitude: selectedItem?.contact.endereco.longitude || 0,
              tooltip: `${selectedItem?.contact.nome || ''} - ${selectedItem?.contact.telefone || ''}`
            }
          ]}
        />
      </div>

      <RegisterContact
        open={registerContact}
        handleClose={() => setRegistercontact(false)}
        onRegister={handleRegisterNewContact}
        onEditContact={itemEdit}
        onSaveEdit={onSaveEdit}
        setEditContact={() => setItemEdit(null)}
      />
    </>
  );
};

export default MainForm;
