import axios from "axios";

const API_URL = 'http://3.225.221.144:8080/api/images'

const getAllImagesByPostId = (postId) => {
    return axios.get(`${API_URL}/posts/${postId}`);
}

export {getAllImagesByPostId}