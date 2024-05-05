import axios from "axios";

const notificationShop = (id) => {
    return axios.get("http://localhost:8080/api/notification/shop/" + id );
}
const notificationUser = (id) => {
    return axios.get("http://localhost:8080/api/notification/user/" + id );
}
const notificationAcc = (id) => {
    return axios.get("http://localhost:8080/api/notification/" + id );
}
const setStatus = (id) => {
    return axios.post("http://localhost:8080/api/notification/" + id );
}
export {notificationShop ,notificationUser ,notificationAcc ,setStatus}