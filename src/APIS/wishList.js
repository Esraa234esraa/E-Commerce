import axios from "axios"
let baseUrl = 'https://ecommerce.routemisr.com/api/v1/wishlist';

export function addProductToWhishList(productId) {
    return axios.post(`${baseUrl}`, { productId }, {
        headers: {
            token: localStorage.getItem('userToken')

        }
    })
};

export function getWishList() {
    return axios.get(`${baseUrl}`, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
};

export function removeProductfromWhishList(prodId) {
    return axios.delete(`${baseUrl}/${prodId}`, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
}