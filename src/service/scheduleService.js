import instance from "./axiosConfig";

const API_URL = "/api/schedules"

const getScheduleByExchangeId = (exchangeId) => {
    return instance.get(`${API_URL}/exchanges/${exchangeId}`);
}

const getAllSchedulesByAccountId = (accountId) => {
    return instance.get(`${API_URL}/accounts/${accountId}`);
}

const createSchedule = (data) => {
    return instance.post(API_URL, data);
}

export {
    getScheduleByExchangeId,
    createSchedule,
    getAllSchedulesByAccountId
};