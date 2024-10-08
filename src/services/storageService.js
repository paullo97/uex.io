// storageService.js
const StorageService = {
  saveUser: (newUser) => {
    const users = StorageService.getUsers() || [];
    const userExists = users.some((user) => user.email === newUser.email);

    if (!userExists) {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
    }
  },
  getUsers: () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : null;
  },
  clearUsers: () => {
    localStorage.removeItem("users");
  },
  userExists: (email) => {
    const users = StorageService.getUsers();
    return users && users.some((user) => user.email === email);
  },
  validateUser: (email, senha) => {
    const users = StorageService.getUsers();
    return (
      users &&
      users.some((user) => user.email === email && user.senha === senha)
    );
  },
  setUserLog: (email) => {
    localStorage.setItem("userLogin", email);
  },
  addContactToUser: (contact) => {
    const emailLogado = localStorage.getItem("userLogin");
    const users = StorageService.getUsers();
  
    const userIndex = users.findIndex((user) => user.email === emailLogado);
  
    if (userIndex !== -1) {
      if (!users[userIndex].contacts) {
        users[userIndex].contacts = [];
      }

      if(!users[userIndex].contacts.some((cont) => cont.cpf === contact.cpf)) { 
        users[userIndex].contacts.push(contact);
        localStorage.setItem("users", JSON.stringify(users));
        console.log(`Contato adicionado ao usuário logado`);
        return true;
      }
      else {
        return false;
      }
    } else {
      console.error(`Usuário logado não encontrado.`);
      return false;
    }
  },
  getContacts: () => {
    const emailLogado = localStorage.getItem("userLogin");
    const users = StorageService.getUsers();
    const userIndex = users.findIndex((user) => user.email === emailLogado);
    
    return users[userIndex]?.contacts || []
  }
};

export default StorageService;
