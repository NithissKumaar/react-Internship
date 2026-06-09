const STORAGE = "familyContacts";

const FamilyAPI = {
  getContacts() {
    return JSON.parse(localStorage.getItem(STORAGE)) || [];
  },

  saveContacts(data) {
    localStorage.setItem(STORAGE, JSON.stringify(data));
  },
};

export default FamilyAPI;