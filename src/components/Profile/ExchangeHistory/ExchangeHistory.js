import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {Pagination} from "@mui/material";
import {formatDate} from "../../../service/format";
import {Button, Modal} from "react-bootstrap";
import {useSelector} from "react-redux";
import {getAllExchangesByAccountId} from "../../../service/accountService";
import {createSchedule, getScheduleByExchangeId} from "../../../service/scheduleService";
import DatePicker, {registerLocale} from "react-datepicker";
import Swal from "sweetalert2";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";
import {confirmExchange, denyExchange} from "../../../service/exchangeService";
import {Link} from "react-router-dom";

registerLocale("vi", vi);
const ExchangeHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [exchanges, setExchanges] = useState([]);
    const [exchange, setExchange] = useState({});
    const [schedule, setSchedule] = useState({});
    const [status, setStatus] = useState("");
    const [postSell, setPostSell] = useState("");
    const [postBuy, setPostBuy] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [exchangeDate, setExchangeDate] = useState(null);
    const [exchangeError, setExchangeError] = useState("");
    const [address, setAddress] = useState("");
    const [addressError, setAddressError] = useState("");
    const [render, setRender] = useState(false);
    const account = useSelector(state => state.myState.account);

    useEffect(() => {
        const data = {status, postSell, postBuy, startDate, endDate};
        getAllExchangesByAccountId(account.id, currentPage - 1, 10, data)
            .then(response => {
                setExchanges(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch(error => {
            console.log(error);
        })
    }, [status, postSell, postBuy, startDate, endDate, currentPage, account, render])

    useEffect(() => {
        if (exchange.id) {
            getScheduleByExchangeId(exchange.id).then(response => {
                setSchedule(response.data);
            }).catch(error => console.log(error))
        }
    }, [exchange])

    const changePage = (event, value) => {
        setCurrentPage(value)
    }

    const handleExchangeDetail = (item) => {
        setShowModal(true);
        setExchange(item);
    }

    const handleShowModalConfirm = (item) => {
        setShowModalConfirm(true);
        setExchange(item);
        setExchangeDate(null);
        setExchangeError("");
        setAddress("");
        setAddressError("");
    }

    const handleChangePostSell = (event) => {
        setPostSell(event.target.value);
        setCurrentPage(1);
    }

    const handleChangePostBuy = (event) => {
        setPostBuy(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
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

    const handleChangeExchangeDate = (date) => {
        setExchangeDate(date);
        setExchangeError("");
    }

    const handleChangeAddress = (event) => {
        setAddress(event.target.value.trim());
        setExchangeError("");
    }

    const handleConfirm = () => {
        if (!exchangeDate || !address) {
            if (!exchangeDate) setExchangeError("Vui lòng không được để trống");
            if (!address) setAddressError("Vui lòng không được để trống");
            return;
        }
        const data = {
            date: format(new Date(exchangeDate), "yyyy-MM-dd"),
            address,
            exchange: {id: exchange.id}
        }
        createSchedule(data).then(response => {
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
        setShowModalConfirm(false);
    }

    const handleDeny = (item) => {
        Swal.fire({
            title: `Xác nhận từ chối trao đổi sản phẩm ?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                denyExchange(item).then(response => {
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

    const handleSuccess = (item) => {
        Swal.fire({
            title: `Xác nhận giao dịch thành công ?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                confirmExchange(item).then(response => {
                    Swal.fire({
                        title: 'Xác nhận thành công !',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                    setRender(!render);
                }).catch(error => {
                    console.log(error);
                    Swal.fire({
                        title: 'Xác nhận thất bại !',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                })
            }
        })
    }

    const handleFail = (item) => {
        Swal.fire({
            title: `Xác nhận giao dịch thất bại ?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Nhập lý do giao dịch thất bại',
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
                        item.reason = rs.value;
                        denyExchange(item).then(response => {
                            Swal.fire({
                                title: 'Xác nhận thành công !',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1500
                            }).then();
                            setRender(!render);
                        }).catch(error => {
                            console.log(error);
                            Swal.fire({
                                title: 'Xác nhận thất bại !',
                                icon: 'error',
                                showConfirmButton: false,
                                timer: 1500
                            }).then();
                        })
                    }
                })
            }
        })
    }

    return (
        <div className="col-12 col-lg-9">
            <div className="container" style={{minHeight: '600px'}}>
                <h3 className="text-uppercase text-center mb-5 mt-3">Lịch sử trao đổi sản phẩm</h3>
                <div className="mb-3 py-4 px-3 bg-gray row gx-2"
                     style={{backgroundColor: "rgb(220,219,219)"}}>
                    <div className="col-md-2">
                        <div className="text-center mb-2 fw-medium">Trạng thái</div>
                        <select className="form-select py-2 border-0"
                                onChange={handleChangeStatus}>
                            <option value="">Tất cả</option>
                            <option value="Chờ xác nhận">Chờ xác nhận</option>
                            <option value="Chờ trao đổi">Chờ trao đổi</option>
                            <option value="Đã trao đổi">Đã trao đổi</option>
                            <option value="Đã hủy">Đã hủy</option>
                        </select>
                    </div>

                    <div className="col-md-3">
                        <div className="text-center mb-2 fw-medium">Sản phẩm bạn muốn đổi</div>
                        <input type="text" className="form-control border-0 py-2"
                               placeholder="Nhập từ khóa tìm kiếm"
                               onChange={handleChangePostSell}/>
                    </div>

                    <div className="col-md-3">
                        <div className="text-center mb-2 fw-medium">Sản phẩm của bạn</div>
                        <input type="text" className="form-control border-0 py-2"
                               placeholder="Nhập từ khóa tìm kiếm"
                               onChange={handleChangePostBuy}/>
                    </div>

                    <div className="col-2">
                        <div className="text-center mb-2 fw-medium">Ngày bắt đầu</div>
                        <input type="date" className="form-control border-0 py-2"
                               onChange={handleChangeStartDate}/>
                    </div>
                    <div className="col-2">
                        <div className="text-center mb-2 fw-medium">Ngày kết thúc</div>
                        <input type="date" className="form-control border-0 py-2"
                               onChange={handleChangeEndDate}/>
                    </div>
                </div>

                <table className="table">
                    <thead>
                    <tr align="center" style={{fontSize: '18px'}}>
                        <th>STT</th>
                        <th>Sản phẩm bạn muốn đổi</th>
                        <th>Ngày tạo yêu cầu</th>
                        <th>Sản phẩm của bạn</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody style={{verticalAlign: 'middle'}}>
                    {!_.isEmpty(exchanges) ? exchanges.map((item, index) => {
                            return (
                                <tr key={item.id} align="center">
                                    <td>
                                        <h6 className="m-0">{index + 1}</h6>
                                    </td>
                                    <td>
                                        <Link to={`/posts/${item.postSell.id}`} className="nav-link">
                                            {item.postSell.title}
                                        </Link>
                                    </td>
                                    <td>{formatDate(item.createdAt)}</td>
                                    <td>
                                        <Link to={`/posts/${item.postBuy.id}`} className="nav-link">
                                            {item.postBuy.title}
                                        </Link>
                                    </td>
                                    <td>{item.status}</td>
                                    <td>
                                        {item.postSell.account.id === account.id && item.status === 'Chờ xác nhận' ?
                                            <>
                                                <button className="btn border-success text-success me-2"
                                                        onClick={() => handleShowModalConfirm(item)}>
                                                    Xác nhận
                                                </button>
                                                <button className="btn border-danger text-danger me-2"
                                                        onClick={() => handleDeny(item)}>
                                                    Từ chối
                                                </button>
                                            </>
                                            :
                                            item.postSell.account.id === account.id && item.status === 'Chờ trao đổi' ?
                                                <>
                                                    <button className="btn border-success text-success me-2"
                                                            onClick={() => handleSuccess(item)}>
                                                        Thành công
                                                    </button>
                                                    <button className="btn border-danger text-danger me-2"
                                                            onClick={() => handleFail(item)}>
                                                        Thất bại
                                                    </button>
                                                </>
                                                :
                                                null
                                        }
                                        <button className="btn border-primary text-primary"
                                                onClick={() => handleExchangeDetail(item)}>
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
                                    onChange={changePage} color="primary"/>
                    </div>
                    :
                    null
                }
            </div>

            {!_.isEmpty(exchange) &&
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
                                    <div className="col-12 text-center fs-5 fw-medium mb-3">Thông tin sản phẩm bán</div>
                                    <div className="col-4">
                                        <img src={exchange.postSell.avatar} alt="" className="img-thumbnail"
                                             style={{aspectRatio: '1/1'}}/>
                                    </div>
                                    <div className="col-8">
                                        <p className="mb-1">
                                            <span
                                                className="fw-medium">Tên sản phẩm bán: </span>{exchange.postSell.title}
                                        </p>
                                        <p className="mb-1">
                                            <span
                                                className="fw-medium">Người đăng: </span>{exchange.postSell.account.username}
                                        </p>
                                        <p className="mb-1">
                                            <span className="fw-medium">Trạng thái: </span>{exchange.postSell.status}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-12 text-center fs-5 fw-medium mb-3">Thông tin sản phẩm mua</div>
                                    <div className="col-4">
                                        <img src={exchange.postBuy.avatar} alt="" className="img-thumbnail"
                                             style={{aspectRatio: '1/1'}}/>
                                    </div>
                                    <div className="col-8">
                                        <p className="mb-1">
                                            <span
                                                className="fw-medium">Tên sản phẩm bán: </span>{exchange.postBuy.title}
                                        </p>
                                        <p className="mb-1">
                                            <span
                                                className="fw-medium">Người đăng: </span>{exchange.postBuy.account.username}
                                        </p>
                                        <p className="mb-1">
                                            <span className="fw-medium">Trạng thái: </span>{exchange.postBuy.status}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-4">
                                <p className="mb-1">
                                    <span className="fw-medium">Ngày gửi đơn: </span>{formatDate(exchange.createdAt)}
                                </p>
                                <p className="mb-1">
                                    <span className="fw-medium">Nội dung trao đổi: </span>{exchange.content}
                                </p>
                                <p className="mb-1">
                                    <span className="fw-medium">Trạng thái trao đổi: </span>{exchange.status}
                                </p>
                                {exchange.status === 'Đã hủy' && exchange.reason &&
                                    <p className="mb-1">
                                        <span className="fw-medium">Lý do: </span>{exchange.reason}
                                    </p>
                                }
                                {!_.isEmpty(schedule) &&
                                    <>
                                        <p className="mb-1">
                                            <span className="fw-medium">Địa chỉ giao dịch: </span>{schedule.address}
                                        </p>
                                        <p className="mb-1">
                                            <span
                                                className="fw-medium">Ngày giao dịch: </span>{formatDate(schedule.date)}
                                        </p>
                                    </>
                                }
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

            <Modal show={showModalConfirm} size="md"
                   onHide={() => setShowModalConfirm(false)}>
                <Modal.Header closeButton>
                    <h3 className="text-center text-house">Xác nhận lịch trao đổi</h3>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="mb-3">
                            <label htmlFor="startDate" className="form-label d-block">
                                <i className="bi bi-calendar-plus me-2"></i>Ngày trao đổi
                            </label>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                locale={vi}
                                selected={exchangeDate}
                                onChange={date => handleChangeExchangeDate(date)}
                                minDate={new Date()}
                                className="form-control"
                                id="startDate"
                                placeholderText="Chọn ngày trao đổi"
                            />
                            <span className="text-danger d-block">{exchangeError}</span>
                        </div>
                        <div>
                            <label htmlFor="address" className="form-label">
                                <i className="fa-solid fa-location-dot me-2"></i>Địa chỉ trao đổi
                            </label>
                            <textarea id="address" className="form-control" name="address"
                                      placeholder="Nhập địa chỉ trao đổi"
                                      onChange={handleChangeAddress}/>
                            <span className="text-danger">{addressError}</span>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalConfirm(false)}
                            style={{minWidth: '80px'}} type="button">
                        Hủy
                    </Button>
                    <Button variant="primary" type="submit"
                            onClick={handleConfirm}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ExchangeHistory;