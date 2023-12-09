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

export {
    getAllAccounts,
    blockAccount,
    unBlockAccount
};