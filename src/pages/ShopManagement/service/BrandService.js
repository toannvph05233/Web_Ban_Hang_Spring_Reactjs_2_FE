import axios from "axios";

export const findAllBrand = () => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/brands")
                .then(response => {
                    return response.data
                }).catch(() => {
                return []
            })
        )
    })
}
export const findOneBrand = (id) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/brands/" + id)
                .then(response => {
                    return response.data
                }).catch(() => {
                return {}
            })
        )
    })
}