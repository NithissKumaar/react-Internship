const responseStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === "responses/saveResponse") {
    localStorage.setItem("responses", JSON.stringify(store.getState().responses.responses));
  }
  return result;
};

export default responseStorageMiddleware;