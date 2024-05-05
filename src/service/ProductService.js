import axios from "axios";

const displayAllProduct = () => {
    return axios.get("http://localhost:8080/api/products" );
}
const displayProductStatus = () => {
    return axios.get("http://localhost:8080/api/products/status" );
}
const getProductById = (id) => {
    return axios.get("http://localhost:8080/api/products/" + id );
}
const displayAllCategory = () => {
    return axios.get("http://localhost:8080/api/categories" );
}
const searchProductByName = (name) => {
    return axios.get("http://localhost:8080/api/products/search/" + name );
}



export {displayAllProduct , displayProductStatus ,displayAllCategory ,getProductById , searchProductByName}