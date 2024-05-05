import axios from "axios";
import {API_URL} from "../../../utils/config";

export const findShop = (accountId) => {

    return new Promise((resolve) => {
        resolve(axios.get(`${API_URL}/api/shops/account/${accountId}`)
            .then(response => {
                return response.data
            }).catch(() => {
                return {}
            }))
    })
}
export const saveShop = (data, navigate) => {
    return new Promise((resolve) => {
        resolve(axios.post(`${API_URL}/api/shops/`, data)
            .then(() => {
                return navigate("/shop-management/profile")
            }).catch(() => {

            }))
    })
}
