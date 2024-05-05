import axios from "axios";

export const findAllCategory = () => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/categories")
                .then(response => {
                    return response.data
                }).catch(() => {
                return []
            })
        )
    })
}
export const findOneCategory = (id) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/categories/" + id)
                .then(response => {
                    return response.data
                }).catch(() => {
                return {}
            })
        )
    })
}