import axios from "axios";
let baseUrl = 'https://ecommerce.routemisr.com/api/v1/brands'
export function getAllBrands() {
    return axios.get(`${baseUrl}`);
}
export function getSpacificBrand(brandId) {
    return axios.get(`${baseUrl}/${brandId}`)
}