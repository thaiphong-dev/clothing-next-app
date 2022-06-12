import axiosClient from "./axiosClient";
const orderApi = {
  getListOrder: (param) => {
    const url = "/api/v1/orders";
    return axiosClient.get(url, { param });
  },
  getOrderByID: (id) => {
    const url = `/api/v1/order/${id}/items`;
    return axiosClient.get(url);
  },
};

export default orderApi;
