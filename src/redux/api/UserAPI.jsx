const STORAGE = "users";

const UserAPI = {
  getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE)) || [];
  },

  saveUsers(data) {
    localStorage.setItem(STORAGE, JSON.stringify(data));
  },
};

export default UserAPI;