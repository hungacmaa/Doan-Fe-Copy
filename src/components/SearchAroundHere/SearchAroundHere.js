import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {Link, useNavigate} from "react-router-dom";
import {searchAroundHere} from "../../service/accountService";
import {useSelector} from "react-redux";
import Swal from "sweetalert2";

const SearchAroundHere = () => {
    const [users, setUsers] = useState([]);
    const account = useSelector(state => state.myState.account);
    const navigate = useNavigate();

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const data = {
                        id: account.id,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                    searchAroundHere(data).then(response => {
                        const users = response.data;
                        users.sort((a, b) => a.distance - b.distance);
                        setUsers(users);
                    }).catch(error => console.log(error))
                },
                error => {
                    Swal.fire({
                        title: 'Vui lòng bật định vị để tìm kiếm!',
                        icon: 'warning',
                        showConfirmButton: true,
                    }).then();
                    navigate("/");
                }
            );
        } else {
            Swal.fire({
                title: 'Trình duyệt không hỗ trợ lấy vị trí!',
                icon: 'error',
                showConfirmButton: true,
            }).then();
            navigate("/");
        }
    }, [])

    return (
        <div className="container min-vh-100">
            {!_.isEmpty(users) ?
                <>
                    <h2 className="text-center m-5">Danh sách người dùng xung quanh đây</h2>
                    <div className="row g-4">
                        {
                            !_.isEmpty(users) ?
                                users.map(user => {
                                    return (
                                        <div className="col-3" key={user.id}>
                                            <div className="border rounded overflow-hidden">
                                                <Link to={`/profile-user/${user.id}`} className="nav-link">
                                                    <div className="position-relative overflow-hidden">
                                                        <div>
                                                            <img className="img-thumbnail" src={user.avatar} alt=""
                                                                 style={{aspectRatio: '1/1'}}/>
                                                        </div>
                                                    </div>
                                                    <div className="pt-4 px-3">
                                                        <h5 className="mb-3 text-center text-truncate">{user.username}</h5>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="text-truncate">
                                                                <i className="fa-solid fa-people-arrows me-2"></i>
                                                                {user.distance} km
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                null
                        }
                    </div>
                </>
                :
                <div className="text-center">
                    <div className="text-danger fs-5">
                        Không tìm thấy người dùng xung quanh đây
                    </div>
                    <Link to="/" className="btn btn-lg btn-primary mt-5 py-3">
                        <i className="fa-solid fa-house-chimney me-3"></i>
                        Trang chủ
                    </Link>
                </div>
            }
        </div>
    );
};

export default SearchAroundHere;