import axiosClient from "./axiosClient";
const userApi = {
  getAlluser: (param) => {
    const url = "/api/v1/users";
    return axiosClient.get(url, { param });
  },
  login: (param) => {
    const url = `/auth/signin`;
    return axiosClient.post(url, param);
  },
  getUserById: (param) => {
    const url = `/users/${param}`;
    return axiosClient.get(url);
  },
  updateUserByID: (id, param) => {
    const url = `/users/${id}`;
    return axiosClient.post(url, param);
  },
  registerUser: (param) => {
    const url = `/signup`;
    return axiosClient.post(url, param);
  },
};
export default userApi;
