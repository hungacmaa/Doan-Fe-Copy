import axios from "axios";

const API_URL = "http://3.236.85.4:8080/api/categories"
const getAllCategories = () => {
    return axios.get(API_URL);
}

export {getAllCategories};