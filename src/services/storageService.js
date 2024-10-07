// storageService.js
const StorageService = {
    saveUser: (newUser) => {
        const users = StorageService.getUsers() || [];
        const userExists = users.some(user => user.email === newUser.email);
        
        if (!userExists) {
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
        }
    },
    getUsers: () => {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : null;
    },
    clearUsers: () => {
        localStorage.removeItem('users');
    },
    userExists: (email) => {
        const users = StorageService.getUsers();
        return users && users.some(user => user.email === email);
    },
    validateUser: (email, senha) => {
        const users = StorageService.getUsers();
        return users && users.some(user => user.email === email && user.senha === senha);
    },
    setUserLog: (email) => {
        localStorage.setItem('userLogin', email);
    }
};

export default StorageService;
