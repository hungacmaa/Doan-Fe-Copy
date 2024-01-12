import React, { useEffect, useState } from 'react';
import _ from "lodash";
import { Link } from "react-router-dom";
import { formatDate } from "../../../service/format";
import { Pagination } from "@mui/material";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllReportsByAccountId } from "../../../service/accountService";
import { createSchedule } from "../../../service/scheduleService";
import Swal from "sweetalert2";
import { blockPost, denyBlockPost, getAllReports } from "../../../service/adminService";

const ReportHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [reportPosts, setReportPosts] = useState([]);
    const [reportPost, setReportPost] = useState({});
    const [status, setStatus] = useState("");
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [render, setRender] = useState(false);
    const account = useSelector(state => state.myState.account);

    useEffect(() => {
        const data = { status, username, title, startDate, endDate };
        if (account.role.name === "ROLE_USER") {
            getAllReportsByAccountId(account.id, data, currentPage - 1, 10)
                .then(response => {
                    setReportPosts(response.data.content);
                    setTotalPages(response.data.totalPages);
                }).catch(error => {
                    console.log(error);
                })
        } else if (account.role.name === "ROLE_ADMIN") {
            getAllReports(data, currentPage - 1, 10)
                .then(response => {
                    setReportPosts(response.data.content);
                    setTotalPages(response.data.totalPages);
                }).catch(error => {
                    console.log(error);
                })
        }
    }, [status, title, username, startDate, endDate, currentPage, account, render])


    const changePage = (event, value) => {
        setCurrentPage(value)
    }

    const handleReportPostDetail = (item) => {
        setReportPost(item);
        setShowModal(true);
    }


    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeStartDate = (event) => {
        setStartDate(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeEndDate = (event) => {
        setEndDate(event.target.value);
        setCurrentPage(1);
    }

    const handleConfirm = () => {

        createSchedule().then(response => {
            Swal.fire({
                title: 'Xác nhận lịch trao đổi thành công !',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then();
            setRender(!render);
        }).catch(error => {
            console.log(error);
            Swal.fire({
                title: 'Xác nhận lịch trao đổi thất bại !',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            }).then();
        })
    }

    const handleDeny = (item) => {
        Swal.fire({
            title: `Xác nhận từ chối đơn báo cáo ?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                denyBlockPost(item).then(response => {
                    Swal.fire({
                        title: 'Từ chối thành công !',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                    setRender(!render);
                }).catch(error => {
                    console.log(error);
                    Swal.fire({
                        title: 'Từ chối thất bại !',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                })
            }
        })
    }

    const handleBlockPost = (item) => {
        Swal.fire({
            title: `Xác nhận khóa bài viết ?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                blockPost(item).then(response => {
                    Swal.fire({
                        title: 'Khóa bài viết thành công !',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                    setRender(!render);
                }).catch(error => {
                    console.log(error);
                    Swal.fire({
                        title: 'Khóa bài viết thất bại !',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                })
            }
        })
    }

    return (
        <div className="col-12 col-lg-9">
            <div className="container" style={{ minHeight: '600px' }}>
                <h3 className="text-uppercase text-center mb-5">Lịch sử báo cáo bài viết</h3>
                <div className="mb-3 py-4 px-3 bg-gray row gx-2"
                    style={{ backgroundColor: "rgb(220,219,219)" }}>
                    <div className="col-md-2">
                        <div className="text-center mb-2 fw-medium">Trạng thái</div>
                        <select className="form-select py-2 border-0"
                            onChange={handleChangeStatus}>
                            <option value="">Tất cả</option>
                            <option value="Chờ phê duyệt">Chờ phê duyệt</option>
                            <option value="Đã trao đổi">Đã phê duyệt</option>
                            <option value="Đã hủy">Đã hủy</option>
                        </select>
                    </div>

                    <div className="col-md-3">
                        <div className="text-center mb-2 fw-medium">Tên bài viết</div>
                        <input type="text" className="form-control border-0 py-2"
                            placeholder="Nhập từ khóa tìm kiếm"
                            onChange={handleChangeTitle} />
                    </div>

                    <div className="col-md-3">
                        <div className="text-center mb-2 fw-medium">Tên người báo cáo</div>
                        <input type="text" className="form-control border-0 py-2"
                            placeholder="Nhập từ khóa tìm kiếm"
                            onChange={handleChangeUsername} />
                    </div>

                    <div className="col-2">
                        <div className="text-center mb-2 fw-medium">Ngày bắt đầu</div>
                        <input type="date" className="form-control border-0 py-2"
                            onChange={handleChangeStartDate} />
                    </div>
                    <div className="col-2">
                        <div className="text-center mb-2 fw-medium">Ngày kết thúc</div>
                        <input type="date" className="form-control border-0 py-2"
                            onChange={handleChangeEndDate} />
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr align="center" style={{ fontSize: '18px' }}>
                            <th>STT</th>
                            <th>Sản phẩm báo cáo</th>
                            <th>Người báo cáo</th>
                            <th>Ngày gửi đơn</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody style={{ verticalAlign: 'middle' }}>
                        {!_.isEmpty(reportPosts) ? reportPosts.map((item, index) => {
                            return (
                                <tr key={item.id} align="center">
                                    <td>
                                        <h6 className="m-0">{index + 1}</h6>
                                    </td>
                                    <td>
                                        {/* <Link to={`/posts/${item.post.id}`} className="nav-link">
                                            {item.post.title}
                                        </Link> */}
                                        <div style={{ paddingLeft: "40px", textAlign: "left" }}>

                                            <Link to={`/posts/${item.post.id}`} className="nav-link fw-medium text-start">
                                                <img src={item.post.avatar} style={{ width: "80px", height: "80px", marginRight: "1rem" }}></img>
                                                {item.post.title}
                                            </Link>
                                        </div>
                                    </td>
                                    <td>
                                        {/* <Link to={`/profile-user/${item.account.id}`} className="nav-link">
                                            {item.account.username}
                                        </Link> */}
                                        <div style={{ paddingLeft: "40px", textAlign: "left" }}>

                                            <Link to={`/profile-user/${item.account.id}`} className="nav-link fw-medium text-start">
                                                <img src={item.account.avatar} style={{ width: "80px", height: "80px", marginRight: "1rem" }}></img>
                                                {item.account.username}
                                            </Link>
                                        </div>
                                    </td>
                                    <td>{formatDate(item.createdAt)}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        {
                                            account.role.name === "ROLE_ADMIN" && item.status === 'Chờ phê duyệt' &&
                                            <>
                                                <button className="btn border-success text-success me-2"
                                                    onClick={() => handleBlockPost(item)}>
                                                    Khóa bài
                                                </button>
                                                <button className="btn border-danger text-danger me-2"
                                                    onClick={() => handleDeny(item)}>
                                                    Từ chối
                                                </button>
                                            </>
                                        }
                                        <button className="btn border-primary text-primary"
                                            onClick={() => handleReportPostDetail(item)}>
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                            :
                            <tr align="center">
                                <td colSpan="6" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className="container">
                {totalPages > 0 ?
                    <div className="col-12 mt-5 d-flex justify-content-center">
                        <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                            onChange={changePage} color="primary" />
                    </div>
                    :
                    null
                }
            </div>

            {!_.isEmpty(reportPost) &&
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết trao đổi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row px-3">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-12 text-center fs-5 fw-medium mb-3">Thông tin bài viết báo cáo
                                    </div>
                                    <div className="col-4">
                                        <img src={reportPost?.post.avatar} alt="" className="img-thumbnail"
                                            style={{ aspectRatio: '1/1' }} />
                                    </div>
                                    <div className="col-8">
                                        <p className="mb-1">
                                            <span
                                                className="fw-medium">Tên sản phẩm bán: </span>{reportPost?.post.title}
                                        </p>
                                        <p className="mb-1">
                                            <span
                                                className="fw-medium">Người đăng: </span>{reportPost?.post.account.username}
                                        </p>
                                        <p className="mb-1">
                                            <span className="fw-medium">Trạng thái: </span>{reportPost.status}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-12 text-center fs-5 fw-medium mb-3">Thông tin người báo cáo
                                    </div>
                                    <div className="col-4">
                                        <img src={reportPost?.account.avatar} alt="" className="img-thumbnail"
                                            style={{ aspectRatio: '1/1' }} />
                                    </div>
                                    <div className="col-8">
                                        <p className="mb-1">
                                            <span
                                                className="fw-medium">Tên đăng nhập: </span>{reportPost.account.username}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-4">
                                <p className="mb-1">
                                    <span className="fw-medium">Ngày gửi đơn: </span>{formatDate(reportPost.createdAt)}
                                </p>
                                <p className="mb-1">
                                    <span className="fw-medium">Trạng thái trao đổi: </span>{reportPost.status}
                                </p>
                                <p className="mb-1">
                                    <span className="fw-medium">Lý do: </span>{reportPost.reason}
                                </p>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </div>
    );
};

export default ReportHistory;