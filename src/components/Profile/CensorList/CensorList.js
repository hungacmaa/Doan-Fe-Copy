import React, { useContext, useEffect, useState } from 'react';
import _ from "lodash";
import { Table } from "reactstrap";
import { Pagination } from "@mui/material";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import image_user from '../../../image/user-image.png';
import { getAllPostsByAccountId } from "../../../service/accountService";
import { WebSocketContext } from "../../WebSocket/WebSocketProvider";
import { acceptCensor, getAllCensor, rejectCensor } from '../../../service/censorService';
import { useSelector } from 'react-redux';

const CensorList = () => {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPagesModal, setTotalPagesModal] = useState(0);
    const [currentPageModal, setCurrentPageModal] = useState(1);
    const [nameSearch, setNameSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const { sendNotify } = useContext(WebSocketContext);
    const [status, setStatus] = useState("");
    const [render, setRender] = useState(false);


    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    const changePageModal = (event, value) => {
        setCurrentPageModal(value);
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeNameSearch = (event) => {
        setNameSearch(event.target.value);
        setCurrentPage(1);
    }

    const { account } = useSelector(state => state.myState);

    const [censors, setCensors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllCensor().then(response => {
            setCensors(response.data);
        }).catch(error => console.log(error));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [render])

    const showPostDetail = (censor) => {
        navigate(`/posts/${censor.post.id}`);
    }

    const acceptCensor1 = (censor) => {
        acceptCensor(censor.id, "Thỏa mãn", account).then(response => {
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Duyệt thành công!',
                showConfirmButton: false,
                timer: 1500
            }).then();

        }
        )
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Duyệt thất bại!',
                    showConfirmButton: false,
                    timer: 1500
                }).then();
            });
        setRender(!render);
    }

    const rejectCensor1 = (censor) => {
        Swal.fire({
            title: 'Nhập lý do khóa',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            cancelButtonText: 'Đóng',
            confirmButtonText: 'Gửi',
            preConfirm: (value) => {
                if (!value) {
                    Swal.showValidationMessage('Vui lòng không để trống')
                }
            }
        }).then((rs) => {
            if (rs.isConfirmed) {
                rejectCensor(censor.id, rs.value, account).then(response => {
                    console.log(response);
                    Swal.fire({
                        icon: 'success',
                        title: 'Khóa bài đăng thành công!',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                }
                )
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Khóa thất bại!',
                            showConfirmButton: false,
                            timer: 1500
                        }).then();
                    });
            }
        })
        setRender(!render);

    }

    return (
        <div className="col-9">
            <h3 className="text-uppercase text-center mb-5 mt-3">Danh sách kiểm duyệt</h3>
            <div className="mb-3 py-4 px-3"
                style={{ backgroundColor: "rgb(220,219,219)" }}>
                <div className={'row g-2'}>
                    <div className="col-md-4">
                        <label className="form-label fw-medium">Tìm kiếm theo tên bài đăng</label>
                        <input type="text" className="form-control border-0 py-2"
                            placeholder="Nhập từ khóa tìm kiếm"
                            value={nameSearch}
                            onChange={handleChangeNameSearch} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-medium">Trạng thái</label>
                        <select className="form-select py-2 border-0"
                            onChange={handleChangeStatus}>
                            <option value="">Tất cả</option>
                            <option value="Chưa kiểm duyệt">Chưa kiểm duyệt</option>
                            <option value="Đã Kiểm duyệt">Đã Kiểm duyệt</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-medium">Sắp xếp theo</label>
                        <select className="form-select py-2 border-0"
                            onChange={handleChangeStatus}>
                            <option value="Newest">Mới nhất</option>
                            <option value="Oldest">Cũ nhất</option>
                        </select>
                    </div>
                    {/* <div className="col-md-4">
                        <label className="form-label fw-medium">Trạng thái</label>
                        <select className="form-select py-2 border-0"
                            onChange={handleChangeStatus}>
                            <option value="">Tất cả</option>
                            <option value="Đang hoạt động">Đang hoạt động</option>
                            <option value="Bị khóa">Bị khóa</option>
                        </select>
                    </div> */}
                    {/* <div className="col-md-8">
                        <label className="form-label fw-medium">Tìm kiếm theo tên đăng nhập</label>
                        <input type="text" className="form-control border-0 py-2"
                            placeholder="Nhập từ khóa tìm kiếm"
                            value={nameSearch}
                            onChange={handleChangeNameSearch} />
                    </div> */}
                </div>
            </div>
            <Table hover>
                <thead>
                    <tr align="center">
                        <th>STT</th>
                        <th>Tên bài đăng</th>
                        <th>Ngày tạo</th>
                        <th>Ngày kiểm duyệt</th>
                        <th>Người kiểm duyệt</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody style={{ verticalAlign: 'middle' }}>
                    {!_.isEmpty(censors) ?
                        censors.map((item, index) => (
                            <tr key={item.id} align="center">
                                <td>{index + 1}</td>
                                <td><img src={item.post.avatar} style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    marginRight: '16px'
                                }}></img>{item.post.title}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.modifiedAt != null ? item.modifiedAt : "Chưa duyệt"}</td>
                                <td>{item.reviewer != null ? item.reviewer.name : "Chưa duyệt"}</td>
                                <td>{item.status}</td>
                                <td className="d-flex justify-content-center">
                                    <button
                                        onClick={() => {
                                            acceptCensor1(item)
                                        }}
                                        className="btn border border-success text-success me-3"
                                        style={{ width: '100px' }}
                                        disabled={item.status === "Chờ kiểm duyệt" ? false : true}
                                    >
                                        Duyệt
                                    </button>
                                    <button
                                        onClick={() => {
                                            rejectCensor1(item)
                                        }}
                                        className="btn border border-danger text-danger me-3"
                                        style={{ width: '100px' }}
                                        disabled={item.status === "Chờ kiểm duyệt" ? false : true}
                                    >
                                        Khóa
                                    </button>
                                    <button
                                        onClick={() => {
                                            showPostDetail(item)
                                        }}
                                        className="btn border border-primary text-primary me-3"
                                        style={{ width: '100px' }}
                                    >
                                        Chi tiết
                                    </button>
                                    {/* {item.status === "Bị khóa" && item.role.name === "ROLE_USER" ?
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
                                } */}
                                </td>
                            </tr>
                        ))
                        :
                        <tr align="center">
                            <td colSpan="6" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                        </tr>
                    }
                </tbody>
                {/* <Modal
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
                                    width={200} />
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
                                        <tr align="center" style={{ fontSize: '20px' }}>
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
                                            onChange={changePageModal} color="primary" />
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
                </Modal> */}
            </Table>
            {totalPages > 0 ?
                <div className="col-12 mt-5 d-flex justify-content-center">
                    <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                        onChange={changePage} color="primary" />
                </div>
                :
                null
            }
        </div>
    );
};

export default CensorList;