import axios from "axios";

const API_URL = "http://localhost:8080/api/categories"
const getAllCategories = () => {
    return axios.get(API_URL);
}

export {getAllCategories};