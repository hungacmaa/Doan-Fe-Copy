import instance from "./axiosConfig";

const API_URL = "/api/exchanges";

const createExchange = (data) => {
    return instance.post(API_URL, data);
}

const confirmExchange = (data) => {
    return instance.put(`${API_URL}/success`, data);
}

const denyExchange = (data) => {
    return instance.put(`${API_URL}/fail`, data);
}

export {
    createExchange,
    confirmExchange,
    denyExchange
}