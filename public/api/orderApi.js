import axiosClient from "./axiosClient";
const orderApi = {
  createOrder: (param) => {
    const url = "/order";
    return axiosClient.post(url, param);
  },
  getListOrder: (param) => {
    const url = "/order";
    return axiosClient.get(url, { param });
  },
  getOrderByID: (id) => {
    const url = `order/${id}`;
    return axiosClient.get(url);
  },
  getOrderByUserID: (id) => {
    const url = `/order/get-by-userId/${id}`;
    return axiosClient.get(url);
  },
  updateOrderByID: (id, param) => {
    const url = `order/${id}`;
    return axiosClient.post(url, param);
  },
  getAllOrder: (param) => {
    const url = `/order?pageNumber=${param.pageNumber}&pageSize=${param.pageSize}`;
    return axiosClient.get(url, param);
  },
};

export default orderApi;
