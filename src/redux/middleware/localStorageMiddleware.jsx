const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("projects", JSON.stringify(store.getState().project.projects));
  return result;
};

export default localStorageMiddleware;