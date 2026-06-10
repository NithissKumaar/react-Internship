const familyStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const contacts = store.getState().family?.contacts || [];
  localStorage.setItem("familyContacts", JSON.stringify(contacts));
  return result;
};

export default familyStorageMiddleware;