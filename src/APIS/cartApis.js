import axios from "axios"
let baseUrl = 'https://ecommerce.routemisr.com/api/v1/cart'
let token = localStorage.getItem('userToken')
// add Cart
export function addToCartApi(productId) {
    return axios.post(`${baseUrl}`, { productId },
        {
            headers: {
                token: localStorage.getItem('userToken')

            }
        })
}

// get cart

export function getCartApi() {
    return axios.get(`${baseUrl}`, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    });
}

//delete 

export function deleteCartApi(id) {
    return axios.delete(`${baseUrl}/${id}`, {
        headers: {
            token: localStorage.getItem('userToken')

        }
    })
}
export function UpdateCartApi({ id, count }) {
    return axios.put(`${baseUrl}/${id}`, { count }, {
        headers: {
            token: localStorage.getItem('userToken')

        }
    })
}
export function clearCartApi() {
    return axios.delete(`${baseUrl}`, {
        headers: {
            token: localStorage.getItem('userToken')

        }
    })
}