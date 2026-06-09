const familyStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("familyContacts", JSON.stringify(store.getState().family.contacts));
  return result;
};

export default familyStorageMiddleware;