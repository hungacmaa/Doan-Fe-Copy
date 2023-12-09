import axios from "axios";

const API_URL = "http://localhost:8080/api/posts"
const getAllPosts = (page = 0, size = 12, data) => {
    return axios.post(`${API_URL}?page=${page}&size=${size}`, data);
}

const getPostById = (postId) => {
    return axios.get(`${API_URL}/${postId}`);
}

export {
    getAllPosts,
    getPostById
};