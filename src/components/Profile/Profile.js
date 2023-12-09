import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import _ from 'lodash';
import Sidebar from "./Sidebar/Sidebar";
import {useSelector} from "react-redux";

const Profile = () => {
    const account = useSelector(state => state.myState.account);
    const navigate = useNavigate();
    useEffect(()=>{
        if (_.isEmpty(account)){
            navigate("/403");
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [account])

    return (
        <div className="container-fluid profile-exchange">
            <div className="bg-white">
                {!_.isEmpty(account) &&
                    <div className="row">
                        <Sidebar/>
                        <Outlet/>
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;