import axiosClient from "./axiosClient";
const cartApi = {
    getCartById: (param) => {
        const url = `/order/${param}`
        return axiosClient.get(url);
    }
}

export default cartApi;