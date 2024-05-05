import axios from "axios";

export const totalByDate = (date,idShop) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/billDetails/total/" + date +"/"+ idShop)
                .then(response => {
                    return response.data
                }).catch(() => {
                return []
            })
        )
    })
}

export const totalByWeek = (date1,date2,idShop) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/billDetails/totalWeek/" + date1 +"/"+ date2 +"/"+ idShop)
                .then(response => {
                    return response.data
                }).catch(() => {
                return []
            })
        )
    })
}

export const totalBill = (date1,date2,idShop) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/billDetails/totalBill/" + date1 +"/"+ date2 +"/"+ idShop)
                .then(response => {
                    return response.data
                }).catch(() => {
                return []
            })
        )
    })
}