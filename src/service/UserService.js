import axios from "axios";

const loginApi = (user) => {
    return axios.post("http://localhost:8080/api/auth/login", user);
}
const register = (user) => {
    return axios.post("http://localhost:8080/api/auth/register" , user);
}
const sendMail = (user) => {
    return axios.post("http://localhost:8080/api/client/create" , user);
}
const emailCheck = () => {
    return axios.get("http://localhost:8080/api/users/email" );
}
const userCheck = () => {
    return axios.get("http://localhost:8080/api/users/user" );
}
export const findUserByAccount = (idAccount)=>{
    return axios.get("http://localhost:8080/api/users/acc/"+idAccount)
}
export const sendmail = (user) => {
    return axios.post("http://localhost:8080/api/client/sendMail" , user);
}
export const savePass= (user) => {
    return axios.post("http://localhost:8080/api/users/change",user)
}
export const findAccountByEmail = (email) => {
    return axios.get("http://localhost:8080/api/users/email/"+email)
}
export const sendMailForgetPass = (form) => {
    return axios.post("http://localhost:8080/api/client/sendMailPass",form)
}
export const findAccountById = (id) => {
    return axios.get("http://localhost:8080/api/users/acc/"+id)
}
export {loginApi , register ,sendMail , userCheck  ,emailCheck}