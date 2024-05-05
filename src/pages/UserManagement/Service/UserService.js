import axios from "axios";

export const findUserByAccount= (idAcc) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/users/account/"+idAcc)
                .then(response => {
                    return response.data
                }).catch(() => {
                return {}
            })
        )
    })
}
export const saveUser = (data,navigate) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/users/",data)
                .then(response => {
                    return navigate("/user-management/profile")
                }).catch(() => {

            })
        )
    })
}