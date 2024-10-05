// storageService.js
const StorageService = {
    saveUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
    },
    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
    clearUser: () => {
        localStorage.removeItem('user');
    },
    userExists: (email) => {
        const user = StorageService.getUser();
        return user && user.email === email;
    }
};

export default StorageService;
