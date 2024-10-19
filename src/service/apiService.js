import { Anchor } from "react-bootstrap";
import axios from "../utils/axiosCustomize";
import qs from "qs";

const postCreateUser = (email, password, username, role, image) => {
  const data = new FormData();

  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("api/v1/participant", data);
};

const getAllUser = () => {
  return axios.get("api/v1/participant/all");
};

const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();

  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.put("api/v1/participant", data);
};

const deleteUser = (userID) => {
  return axios.delete("api/v1/participant", { data: { id: userID } });
};

const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  return axios.post(`api/v1/login`, { email, password });
};

const postRegister = (email, username, password) => {
  return axios.post(`api/v1/register`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    email,
    username,
    password,
  });
};

export {
  postCreateUser,
  getAllUser,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
};
