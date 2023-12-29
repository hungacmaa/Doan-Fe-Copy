import React, {useContext, useEffect, useState} from 'react';
import _ from "lodash";
import {Table} from "reactstrap";
import {Pagination} from "@mui/material";
import Swal from "sweetalert2";
import {Button, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import {blockAccount, getAllAccounts, unBlockAccount} from "../../../service/adminService";
import image_user from '../../../image/user-image.png';
import {getAllPostsByAccountId} from "../../../service/accountService";
import {WebSocketContext} from "../../WebSocket/WebSocketProvider";

const CategoryProductList = () => {

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    return (
        <div className="col-9">
            <h3 className="text-uppercase text-center mb-5 mt-3">Danh sách Thể loại sản phẩm</h3>
            <div className="mb-3 py-4 px-3"
                 style={{backgroundColor: "rgb(220,219,219)"}}>
                {/* <div className={'row g-2'}>
                    <div className="col-md-4">
                        <label className="form-label fw-medium">Trạng thái</label>
                        <select className="form-select py-2 border-0"
                                onChange={handleChangeStatus}>
                            <option value="">Tất cả</option>
                            <option value="Đang hoạt động">Đang hoạt động</option>
                            <option value="Bị khóa">Bị khóa</option>
                        </select>
                    </div>
                    <div className="col-md-8">
                        <label className="form-label fw-medium">Tìm kiếm theo tên đăng nhập</label>
                        <input type="text" className="form-control border-0 py-2"
                               placeholder="Nhập từ khóa tìm kiếm"
                               value={nameSearch}
                               onChange={handleChangeNameSearch}/>
                    </div>
                </div> */}
            </div>
            <Table hover>
                <thead>
                <tr align="center">
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Mô tả</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody style={{verticalAlign: 'middle'}}>
                {/* {!_.isEmpty(users) ?
                    users.map((item, index) => (
                        <tr key={item.id} align="center">
                            <td>{index + 1}</td>
                            <td>{item.username}</td>
                            <td>{item.role.name === "ROLE_ADMIN" ? "Admin" : "Người dùng"}</td>
                            <td>{item.status}</td>
                            <td className="d-flex justify-content-center">
                                <button
                                    onClick={() => {
                                        showUserDetail(item)
                                    }}
                                    className="btn border border-primary text-primary me-3"
                                    style={{width: '100px'}}>
                                    Chi tiết
                                </button>
                                {item.status === "Bị khóa" && item.role.name === "ROLE_USER" ?
                                    <button
                                        onClick={() => handleUnBlockAccount(item.id)}
                                        className="btn border border-danger text-danger"
                                        style={{width: '100px'}}>
                                        Mở khóa
                                    </button>
                                    :
                                    item.role.name === "ROLE_USER" ?
                                        <button
                                            onClick={() => handleBlockAccount(item.id)}
                                            className="btn border border-secondary text-secondary"
                                            style={{width: '100px'}}>
                                            Khóa
                                        </button>
                                        :
                                        null
                                }
                            </td>
                        </tr>
                    ))
                    :
                    <tr align="center">
                        <td colSpan="6" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                    </tr>
                } */}
                </tbody>
            </Table>
            {totalPages > 0 ?
                <div className="col-12 mt-5 d-flex justify-content-center">
                    <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                onChange={changePage} color="primary"/>
                </div>
                :
                null
            }
        </div>
    );
};

export default CategoryProductList;