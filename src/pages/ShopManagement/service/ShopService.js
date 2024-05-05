import axios from "axios";
import {API_URL} from "../../../utils/config";

export const findOneShop = (id) => {
    return new Promise((resolve) => {
        resolve(
            axios.get(`${API_URL}/api/shops/${id}`)
                .then(response => {
                    return response.data
                }).catch(() => {
                return {}
            })
        )
    })
}
