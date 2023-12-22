import axios from "axios";

const API_URL = "http://34.204.174.17:8080/api/categories"
const getAllCategories = () => {
    return axios.get(API_URL);
}

export {getAllCategories};