import { useState } from "react";
import ContactsList from "./components/contacts";
import Map from "./components/map";
import "./styles.css";
import RegisterContact from "./components/registerContact";

const MainForm = () => {
  const [registerContact, setRegistercontact] = useState(false);

  const registerNewContact = () => {
    setRegistercontact(true);
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
      />
    </>
  );
};

export default MainForm;
