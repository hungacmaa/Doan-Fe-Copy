import React, {useEffect, useState} from 'react';
import image_default from '../../../image/user-image.png';
import {getAccountById} from "../../../service/accountService";
import EditAccountInformation from "./EditAccountInformation";
import _ from "lodash";
import {useSelector} from "react-redux";

const AccountInformation = () => {
    const [accountInfo, setAccountInfo] = useState({});
    const account = useSelector(state => state.myState.account);

    useEffect(() => {
        getAccountById(account.id).then(response => {
            setAccountInfo(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [account])
    return (
        <div className="col-12 col-lg-9">
            <h3 className="text-center text-uppercase mb-5 mt-3">Thông tin cá nhân</h3>
            <div className="row">
                <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center text-center px-3">
                        <span className="mb-3 fw-medium">Ảnh đại diện</span>
                        <img className="rounded-circle" width="200px" height="200px"
                             src={accountInfo.avatar ? accountInfo.avatar : image_default} alt="" id="image"
                             name="avatar"/>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item py-3">
                                <span className="fw-medium">Tên đăng nhập:</span> {account.username}
                            </li>
                            <li className="list-group-item py-3">
                                <span className="fw-medium">Họ và tên:</span> {accountInfo.name ? accountInfo.name : 'Chưa có thông tin'}
                            </li>
                            <li className="list-group-item py-3">
                                <span className="fw-medium">Địa chỉ:</span> {accountInfo.address ? accountInfo.address : 'Chưa có thông tin'}
                            </li>
                            <li className="list-group-item py-3">
                                <span className="fw-medium">Số điện thoại:</span> {accountInfo.phone ? accountInfo.phone : 'Chưa có thông tin'}
                            </li>
                        </ul>
                    </div>
                </div>

                {!_.isEmpty(accountInfo) &&
                    <EditAccountInformation accountInfo={accountInfo}/>
                }
            </div>
        </div>
    );
};

export default AccountInformation;