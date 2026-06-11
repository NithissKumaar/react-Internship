const employeeStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  if (state?.employee?.employees) {
    localStorage.setItem("employees", JSON.stringify(state.employee.employees));
  }

  return result;
};

export default employeeStorageMiddleware;