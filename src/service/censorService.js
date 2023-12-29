import instance from "./axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/censors";

const getAllCensor = () => {
    return instance.get(`${API_URL}`);
}

const acceptCensor = (censorId, reason, account) => {
    return instance.put(`${API_URL}/accept/${censorId}`,
        {
            reason: reason,
            account: account
        }, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
    });
}

const rejectCensor = (censorId, reason, account) => {
    return instance.put(`${API_URL}/reject/${censorId}`,
        {
            reason: reason,
            account: account
        }, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
    });
}

export {
    getAllCensor,
    acceptCensor,
    rejectCensor
};