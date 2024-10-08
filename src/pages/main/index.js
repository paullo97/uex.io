import { useState } from "react";
import ContactsList from "./components/contacts";
import "./styles.css";
import RegisterContact from "./components/registerContact";
import StorageService from "../../services/storageService";
import { useAlert } from "../../services/alertService";
import ShowMap from "./components/showMap";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import { Close, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { ConfirmDelete } from "./components/confirmDelete";

const MainForm = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [registerContact, setRegistercontact] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemEdit, setItemEdit] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const registerNewContact = () => {
    setRegistercontact(true);
  };

  const handleRegisterNewContact = (contact) => {
    setRegistercontact(false);
    const result = StorageService.addContactToUser(contact);
    showAlert(
      result ? "success" : "error",
      result
        ? "Contact Added Successfully"
        : "Contact with CPF already on the List"
    );
  };

  const editItem = (contact) => {
    setItemEdit(contact);
    setRegistercontact(true);
  };

  const onSaveEdit = (contactEdit) => {
    setRegistercontact(false);
    const { index, cpf, nome, telefone, endereco } = contactEdit;
    StorageService.editContact(index, {
      cpf,
      nome,
      telefone,
      endereco
    });
    showAlert('success', 'Success on Edit Contact');
  };

  const logOut = () => {
    StorageService.logOut();
    navigate("/login");
  };

  const deleteAccount = () => {
    setConfirmDelete(true);
  }

  const verifyPassword = (password) => {
    const result = StorageService.deleteAccount(password);
    if(result) {
      showAlert('success', 'Success Deleting Account');
      logOut();
      return;
    }

    setConfirmDelete(false);
    showAlert('error', 'Password Wrong!');
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'end'}}>
        <Tooltip title="Delete Account" arrow placement="bottom">
            <IconButton
              aria-label="Delete Account"
              onClick={deleteAccount}
              sx={{ color: "red" }}
            >
              <Close />
            </IconButton>
          </Tooltip>

          <Tooltip title="Logout" arrow placement="bottom">
            <IconButton
              aria-label="Log out"
              onClick={logOut}
              sx={{ color: "white" }}
            >
              <Logout />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

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
              tooltip: `${selectedItem?.contact.nome || ""} - ${
                selectedItem?.contact.telefone || ""
              }`,
            },
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

      <ConfirmDelete
        open={confirmDelete}
        handleClose={() => setConfirmDelete(false)}
        verifyPassword={verifyPassword}
      />
    </>
  );
};

export default MainForm;
