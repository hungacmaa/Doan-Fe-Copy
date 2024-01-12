import axios from "axios";

const API_URL = "http://3.225.221.144:8080/api/categories"
const getAllCategories = () => {
    return axios.get(API_URL);
}

export {getAllCategories};