import axios from "axios";
import {toast} from "react-toastify";

const showCartDetailUserSelect = (idCarts) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/carts/showProductUserSelect", idCarts)
                .then((response) => {
                    return response.data
                }).catch(() => {
                toast.error("Lỗi không đặt được hàng")
            })
        )
    })
}

const showBillByAccountAndStatus = (idAccount, status) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bills?idAccount=" + idAccount + "&status=" + status)
                .then(response => {
                    return response.data
                }).catch(() => {
                return []
            })
        )
    })
}

const saveBill = (idAccount, idCartDetails, navigate, selectedPay, total) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/bills/save/bill?idAccount=" + idAccount, idCartDetails)
                .then((resp) => {
                    console.log("respresp")
                    console.log("respresp")
                    console.log(resp)
                    if (selectedPay === "paypal") {
                        const idList = resp.data.map(item => item.id);

                        const pay = {idBills: idList, total: total/23000}
                        axios.post("http://localhost:8080/api/pay", pay).then(resp => {
                            window.open(resp.data);
                            navigate("/user-management/order/confirm")
                        })
                    } else if (selectedPay === "vnpay") {
                        const idList = resp.data.map(item => item.id);

                        const pay = {idBills: idList, total}
                        axios.post("http://localhost:8080/api/pay/vnpay", pay).then(resp => {
                            window.open(resp.data);
                            navigate("/user-management/order/confirm")
                        })
                    } else {
                        toast.success("Đặt hàng thành công, vui lòng chờ chủ shop xác nhận !", {autoClose: 700})
                        navigate("/user-management/order/confirm")
                    }
                }).catch(() => {
                toast.error("Lỗi không đặt được hàng", {autoClose: 700})
            })
        )
    })
}

const cancelBill = (idBill) => {
    return new Promise((resolve) => {
        resolve(
            axios.delete("http://localhost:8080/api/bills/" + idBill)
                .then(response => {
                    return response.data
                }).catch(() => {
                return []
            })
        )
    })
}

const receive = (idBill) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/bills/receive?idBill=" + idBill)
                .then(() => {
                    toast.success("Nhận hàng thành công!", {autoClose: 700})
                }).catch(() => {
                toast.error("Lỗi không nhận được hàng!", {autoClose: 700})
            })
        )
    })
}
const cancelBillByReason = (idBill, reason) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/bills/cancel?idBill=" + idBill + "&reason=" + reason)
                .then(() => {
                    if (reason.length > 0) {
                        toast.success("Hủy đơn hàng thành công!", {autoClose: 700})
                    } else {
                        toast.error("Bạn cần nhập lý do hủy đơn hàng", {autoClose: 700})
                    }
                }).catch(() => {
                toast.error("Lỗi không hủy được đơn hàng", {autoClose: 700})
            })
        )
    })
}

export {showCartDetailUserSelect, showBillByAccountAndStatus, saveBill, cancelBill, cancelBillByReason, receive}
