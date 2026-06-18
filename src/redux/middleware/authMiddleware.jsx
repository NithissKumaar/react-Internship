const authMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type === "auth/adminSignin/fulfilled") {
    const auth = store.getState().auth;
    localStorage.setItem("auth", JSON.stringify(auth));
  }

  return result;
};

export default authMiddleware;