import instance from "./axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/statistics";

const getStatisticPost = () => {
    return instance.get(`${API_URL}/post-by-category-product`);
}

const getStatisticCensor = () => {
    return instance.get(`${API_URL}/censor`);
}

const getStatisticExchange = () => {
    return instance.get(`${API_URL}/exchange`);
}

const getStatisticUser = () => {
    return instance.get(`${API_URL}/user`);
}

const getTotalPost = () => {
    return instance.get(`${API_URL}/total-post`);
}

const getTotalExchange = () => {
    return instance.get(`${API_URL}/total-exchange`);
}

export {
    getStatisticPost,
    getStatisticCensor,
    getStatisticExchange,
    getStatisticUser,
    getTotalPost,
    getTotalExchange
};