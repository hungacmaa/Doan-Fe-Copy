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

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [totalPagesModal, setTotalPagesModal] = useState(0);
    const [currentPageModal, setCurrentPageModal] = useState(1);
    const [nameSearch, setNameSearch] = useState("");
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const {sendNotify} = useContext(WebSocketContext);
    const [status, setStatus] = useState("");
    const [render, setRender] = useState(false);

    useEffect(() => {
        getAllAccounts(status, nameSearch, currentPage - 1).then(response => {
            setUsers(response.data.content);
            setTotalPages(response.data.totalPages);
        }).catch(error => console.log(error));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage, nameSearch, status, render])

    useEffect(() => {
        if (user.id) {
            getAllPostsByAccountId(user.id, currentPageModal - 1, 5, {}).then(response => {
                setPosts(response.data.content);
                setTotalPagesModal(response.data.totalPages);
            }).catch(error => console.log(error));
        }
    }, [user, currentPageModal])

    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    const changePageModal = (event, value) => {
        setCurrentPageModal(value);
    }
    const handleBlockAccount = (id) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn khóa tài khoản này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                blockAccount(id).then(() => {
                    setRender(!render);
                    Swal.fire({
                        icon: 'success',
                        title: 'Khóa tài khoản thành công !',
                        showConfirmButton: false,
                        timer: 1000
                    }).then();
                    sendNotify({
                        content: "Admin đã khóa tài khoản của bạn",
                        receiver: {id}
                    });
                }).catch(error => {
                    console.log(error);
                });
            }
        })
    }
    const handleUnBlockAccount = (id) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn mở khóa tài khoản này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                unBlockAccount(id).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Mở khóa tài khoản thành công !',
                        showConfirmButton: false,
                        timer: 1000
                    }).then();
                    setRender(!render);
                }).catch(error => {
                    console.log(error);
                });
            }
        })
    }

    const showUserDetail = (user) => {
        setUser({...user});
        setCurrentPageModal(1);
        setShowModal(true);
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeNameSearch = (event) => {
        setNameSearch(event.target.value);
        setCurrentPage(1);
    }


    return (
        <div className="col-9">
            <h3 className="text-uppercase text-center mb-5 mt-3">Danh sách người dùng</h3>
            <div className="mb-3 py-4 px-3"
                 style={{backgroundColor: "rgb(220,219,219)"}}>
                <div className={'row g-2'}>
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
                </div>
            </div>
            <Table hover>
                <thead>
                <tr align="center">
                    <th>STT</th>
                    <th>Tên đăng nhập</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody style={{verticalAlign: 'middle'}}>
                {!_.isEmpty(users) ?
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
                }
                </tbody>
                <Modal
                    size="xl"
                    show={showModal}
                    onHide={() => setShowModal(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Chi tiết người dùng
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-4 text-center">
                                <img src={user.avatar ? user.avatar : image_user} alt="" height={200}
                                     width={200}/>
                            </div>
                            <div className="col-7">
                                <Table hover>
                                    <thead>
                                    <tr>
                                        <th>Tên tài khoản:</th>
                                        <td>{user.username}</td>
                                    </tr>
                                    <tr>
                                        <th>Họ và tên:</th>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Địa chỉ:</th>
                                        <td>{user.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Mật khẩu:</th>
                                        <td>{user.password}</td>
                                    </tr>
                                    <tr>
                                        <th>Trạng thái:</th>
                                        <td>{user.status}</td>
                                    </tr>
                                    </thead>
                                </Table>
                            </div>
                            <div className="row mt-2">
                                <h3 className="text-md-center mb-3">Danh sách các bài viết</h3>
                                <Table hover>
                                    <thead>
                                    <tr align="center" style={{fontSize: '20px'}}>
                                        <th>STT</th>
                                        <th>Tên bài viết</th>
                                        <th>Danh mục bài viết</th>
                                        <th>Địa chỉ</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {!_.isEmpty(posts) ?
                                        posts.map((post, index) => (
                                            <tr key={post.id} align="center">
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <Link to={`/posts/${post.id}`} className="nav-link fw-medium">
                                                        {post.title}
                                                    </Link>
                                                </td>
                                                <td>{post.categoryPost}</td>
                                                <td className="text-truncate">{post.address}</td>
                                                <td>{post.status}</td>
                                            </tr>
                                        ))
                                        :
                                        <tr align="center">
                                            <td colSpan="5" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                                        </tr>

                                    }
                                    </tbody>
                                </Table>

                                {totalPagesModal > 0 ?
                                    <div className="col-12 mt-3 d-flex justify-content-center">
                                        <Pagination count={totalPagesModal} size="large" variant="outlined"
                                                    shape="rounded"
                                                    onChange={changePageModal} color="primary"/>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="py-2 px-3"
                                onClick={() => setShowModal(false)}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
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

export default UserList;