const userStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("user/")) {
    localStorage.setItem("users", JSON.stringify(store.getState().user.users));
  }
  return result;
};
export default userStorageMiddleware;