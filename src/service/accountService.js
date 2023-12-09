import instance from "./axiosConfig";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/accounts";
const getAllPostsByAccountId = (accountId, page = 0, size = 5, data) => {
    return instance.post(`${API_URL}/${accountId}/posts?page=${page}&size=${size}`, data);
}

const listUserAndUnreadMessage = (accountId) => {
    return instance.get(`${API_URL}/${accountId}/messages`);
}
const searchUsersMessage = (accountId, username) => {
    return instance.get(`${API_URL}/${accountId}/messages/search?username=${username}`);
}

const getAccountById = (id) => {
    return instance.get(`${API_URL}/${id}`);
}

const editAccountInformation = (id, data) => {
    return instance.put(`${API_URL}/${id}`, data);
}

const changeAccountPassword = (accountId, data) => {
    return instance.put(`${API_URL}/${accountId}/change-password`, data);
}

const checkPasswordByAccountId = (accountId, data) => {
    return instance.post(`${API_URL}/${accountId}/check-password`, data);
}

const getAllExchangesByAccountId = (accountId, page = 0, size = 10, data) => {
    return instance.post(`${API_URL}/${accountId}/exchanges?page=${page}&size=${size}`, data);
}

const getPostPinByAccountSellAndAccountBuy = (accountSell, accountBuy) => {
    return instance.get(`${API_URL}/${accountSell}/${accountBuy}/post-pin`);
}

const createPost = (data) =>{
    return instance.post(`${API_URL}/posts`, data);
}

const editPost = (data) =>{
    return instance.put(`${API_URL}/posts/${data.id}`, data);
}

const changeLocationAccount = (accountId, data) => {
    return instance.put(`${API_URL}/${accountId}/location`, data);
}

const searchAroundHere = (data) => {
    return axios.post(`http://localhost:8080${API_URL}/search-around-here`, data);
}


export {
    getAllPostsByAccountId,
    listUserAndUnreadMessage,
    searchUsersMessage,
    getAccountById,
    editAccountInformation,
    changeAccountPassword,
    checkPasswordByAccountId,
    getAllExchangesByAccountId,
    getPostPinByAccountSellAndAccountBuy,
    createPost,
    editPost,
    changeLocationAccount,
    searchAroundHere
};
