import axiosClient from "./axiosClient";

const ProductsApi = {
  getAllProduct: (param) => {
    const url = "/product";
    return axiosClient.get(url, { param });
  },
  getProductById: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
};

export default ProductsApi;
