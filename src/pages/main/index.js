import { useState } from "react";
import ContactsList from "./components/contacts";
import Map from "./components/map";
import "./styles.css";
import RegisterContact from "./components/registerContact";
import StorageService from '../../services/storageService';
import { useAlert } from "../../services/alertService";

const MainForm = () => {
  const { showAlert } = useAlert();


  const [registerContact, setRegistercontact] = useState(false);

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
  
  return (
    <>
      <div className="main-content">
        <ContactsList registerNewContact={registerNewContact} />
        <Map />
      </div>

      <RegisterContact
        open={registerContact}
        handleClose={() => setRegistercontact(false)}
        onRegister={handleRegisterNewContact}
      />
    </>
  );
};

export default MainForm;
