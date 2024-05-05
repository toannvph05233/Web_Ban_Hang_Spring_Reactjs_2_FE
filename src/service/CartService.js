import axios from "axios";
import {toast} from "react-toastify";

export const addToCart = (cart, id) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/carts/add?idAccount="+id, cart)
                .then(() => {
                    toast.success("Thêm sản phẩm thành công",{ autoClose: 700 })
                }).catch(() => {
                toast.error("Thêm sản phẩm thất bại",{ autoClose: 700 })
            })
        )
    })
}

export const showCart = (id) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/carts/"+id)
                .then(response => {
                    return response.data
                }).catch(() => {
                    return []
            })
        )
    })
}

export const deleteProductFromCart = (idCartDetail) => {
    return new Promise((resolve) => {
        resolve(
            axios.delete("http://localhost:8080/api/carts/"+idCartDetail)
                .then(response => {
                    return response.data
                }).catch(() => {
                    return []
            })
        )
    })
}
export const deleteAllProductFromCart = (idCart) => {
    return new Promise((resolve) => {
        resolve(
            axios.delete("http://localhost:8080/api/carts/deleteAll/"+idCart)
                .then(response => {
                    return response.data
                }).catch(() => {
                return []
            })
        )
    })
}

export const updateQuantity = (quantity, idProduct, idCart) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/carts/update?quantity="+quantity+"&&idProduct="+idProduct+"&&idCart="+idCart)
                .then(() => {
                    console.log("Cập nhật số lượng thành công")
                }).catch(() => {
                return []
            })
        )
    })
}