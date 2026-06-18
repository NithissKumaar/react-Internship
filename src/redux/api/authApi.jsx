import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

export const adminSigninAPI = (data) => {
  const form = new URLSearchParams();
  form.append("username", data.username);
  form.append("password", data.password);

  return API.post("/auth/admin_signin/", form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const adminInfoAPI = (token) => {
  return API.post(
    "/auth/admin_info/",
    {},
    {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export default API;