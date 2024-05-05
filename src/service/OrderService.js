import axios from "axios";

const listOrder = (cartDTO) => {
    return axios.post("http://localhost:8080/api/cartDetails/shop" ,cartDTO );
}
const changeOrder = (cartDTO) => {
    return axios.post("http://localhost:8080/api/cartDetails/changeOrder" ,cartDTO );
}
const allOrderByShop = (idAcc) => {
    return axios.get("http://localhost:8080/api/cartDetails/allOrder/" + idAcc );
}
const listBillByShop = (idAcc) => {
    return axios.get("http://localhost:8080/api/billDetails/shop/bill/" + idAcc );
}
const listBillDetailByShop = (idAcc) => {
    return axios.get("http://localhost:8080/api/billDetails/shop/" + idAcc );
}
const acceptOrder = (listBillDetails) => {
    return axios.post("http://localhost:8080/api/bills/accept" ,listBillDetails );
}
const rejectionOrder = (listBillDetails , rejection) => {
    return axios.post("http://localhost:8080/api/bills/rejection?reason=" + rejection ,listBillDetails );
}
export {listOrder ,allOrderByShop ,changeOrder , listBillByShop ,listBillDetailByShop ,acceptOrder ,rejectionOrder}