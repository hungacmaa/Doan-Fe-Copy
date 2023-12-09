import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    account: JSON.parse(localStorage.getItem("account")) ?
        JSON.parse(localStorage.getItem("account")) :
        {},
    unreadMessage: 0,
    unreadNotify: 0,
    notifyList: [],
    toggleStatus: true
};

const accountSlice = createSlice({
    name: "myState",
    initialState,
    reducers: {
        editAccount: (state, action)=>{
            state.account = action.payload;
        },
        countUnreadMessage: (state, action)=>{
            state.unreadMessage = action.payload;
        },
        countUnreadNotify: (state, action)=>{
            state.unreadNotify = action.payload;
        },
        getAllNotify: (state, action)=>{
            state.notifyList = action.payload;
        },
        changeStatus: (state)=>{
            state.toggleStatus = !state.toggleStatus;
        },
        removeAccount: (state)=>{
            state.account = {};
        },
        getAccountLogin: (state, action)=>{
            state.account = action.payload;
        },
    }
})

export const {
    editAccount,
    countUnreadMessage,
    getAccountLogin,
    removeAccount,
    countUnreadNotify,
    getAllNotify,
    changeStatus
} = accountSlice.actions
export default accountSlice.reducer;