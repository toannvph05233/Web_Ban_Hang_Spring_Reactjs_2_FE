import axios from "axios";

export const findAllCity = () => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/cities")
                .then(response => {
                    return response.data
                }).catch(() => {
                    return []
            })
        )
    })
}

export const findAllDistrictByIdCity = (id) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/districts/city/" +id)
                .then(response => {
                    return response.data
                }).catch(() => {
                    return []
            })
        )
    } )
}

export const findAllWardsByIdDistrict = (id) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/wards/district/" +id)
                .then(response => {
                    return response.data
                }).catch(() => {
                    return []
            })
        )
    })
}
export const findByIdCity = (id) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/cities" +id)
                .then(response => {
                    return response.data
                }).catch(() => {
                    return []
            })
        )
    })
}





