import axiosClient from "./axiosClient";

const ProductsApi = {
  getAllProduct: (param) => {
    const url = "/product";
    return axiosClient.get(url, param);
  },
  getProductById: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
  updateProductById: (id, param) => {
    const url = `/product/${id}`;
    return axiosClient.post(url, param);
  },
  deleteProductById: (id) => {
    const url = `/product/${id}`;
    return axiosClient.delete(url);
  },
};

export default ProductsApi;
