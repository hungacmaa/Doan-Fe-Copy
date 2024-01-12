import instance from "./axiosConfig";

const API_URL = "/api/admin";
const getAllAccounts = (status = "", username = "", page = 0, size = 12) => {
    return instance.get(`${API_URL}/accounts?status=${status}&username=${username}&page=${page}&size=${size}`);
}

const blockAccount = (accountId) => {
    return instance.get(`${API_URL}/accounts/block/${accountId}`);
}

const unBlockAccount = (accountId) => {
    return instance.get(`${API_URL}/accounts/unblock/${accountId}`);
}

const getAllReports = (data, page = 0, size = 10) => {
    return instance.post(`${API_URL}/report-post?page=${page}&size=${size}`, data);
}

const blockPost = (data) => {
    return instance.post(`${API_URL}/block-post`, data);
}

const denyBlockPost = (data) => {
    return instance.post(`${API_URL}/deny-block-post`, data);
}

export {
    getAllAccounts,
    blockAccount,
    unBlockAccount,
    getAllReports,
    blockPost,
    denyBlockPost
};