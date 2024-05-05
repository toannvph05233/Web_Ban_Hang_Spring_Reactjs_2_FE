import axios from "axios";

export const findCommentByIdP = (id) => {
    return axios.get("http://localhost:8080/api/comments/product/" + id);
}
export const saveComment = (comment) => {
    return axios.post("http://localhost:8080/api/comments/", comment);
}

export const createReply = (id, reply) => {
    return axios.post(`http://localhost:8080/api/comments/reply?id=${id}&reply=${reply}`);
}