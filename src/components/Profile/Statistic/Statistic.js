import React, { useContext, useEffect, useState } from 'react';
import _ from "lodash";
import { Table } from 'reactstrap';
import { getStatisticCensor, getStatisticExchange, getStatisticPost, getStatisticUser, getTotalExchange, getTotalPost } from '../../../service/statisticService';

const StatisticPage = () => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [statisticPost, setStatisticPost] = useState([]);
    const [totalPost, setTotalPost] = useState(0);

    const [statisticCensor, setStatisticCensor] = useState({});

    const [statisticExchange, setStatisticExchange] = useState([]);
    const [totalExchange, setTotalExchange] = useState(0);

    const [statisticUser, setStatisticUser] = useState([]);

    const handleStatistic = () => {

    }

    useEffect(() => {
        getStatisticPost().then(response => {
            console.log(response);
            setStatisticPost(response.data);
        }).catch(error => console.log(error));

        getTotalPost().then(response => {
            setTotalPost(response.data);
        }).catch(error => console.log(error));

        getStatisticCensor().then(response => {
            setStatisticCensor(response.data);
        }).catch(error => console.log(error));

        getStatisticExchange().then(response => {
            setStatisticExchange(response.data);
        }).catch(error => console.log(error))

        getTotalExchange().then(response => {
            setTotalExchange(response.data);
        }).catch(error => console.log(error))

        getStatisticUser().then(response => {
            setStatisticUser(response.data);
        }).catch(error => console.log(error))

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])

    return (
        <div className="col-9">
            <h3 className="text-uppercase text-center mb-5 mt-3">Thống kê</h3>
            <div className="mb-3 py-4 px-3"
                style={{ backgroundColor: "rgb(220,219,219)" }}>
                <div className={'row g-2 d-flex justify-content-beetween'}>

                    <div className='col-3'></div>

                    <div className="col-2">
                        <label className="form-label d-block text-center mb-2 fw-medium text-black"
                            htmlFor="startDate" style={{ fontSize: '18px' }}>
                            Ngày bắt đầu
                        </label>
                        <input id="startDate" type="date" className="form-control border-0 py-3"
                            onChange={event => setStartDate(event.target.value)} />
                    </div>

                    <div className="col-2">
                        <label className="form-label d-block text-center mb-2 fw-medium text-black"
                            htmlFor="endDate" style={{ fontSize: '18px' }}>
                            Ngày kết thúc
                        </label>
                        <input id="endDate" type="date" className="form-control border-0 py-3"
                            onChange={event => setEndDate(event.target.value)} />
                    </div>

                    <div className="col-2">
                        <label className="form-label d-block text-center mb-2 fw-medium"
                            style={{ color: 'transparent', fontSize: '18px' }}>
                            Tìm kiếm
                        </label>
                        <button className="btn btn-dark border-0 py-3 px-4"
                            onClick={handleStatistic}>
                            Thống kê
                            <i className="fa-solid fa-magnifying-glass ms-2"></i>
                        </button>
                    </div>

                    <div className='col-3'></div>

                </div>
            </div>
            <div className="mb-3 py-4">
                <div className={'row g-2 d-flex justify-content-around'}>

                    {/* Thống kê bài đăng */}
                    <div className={'col-5 mx-4 my-4 border rounded p-4'} style={{ backgroundColor: "rgb(220,219,219)" }}>
                        <h3 className='text-center'>Bài đăng</h3>
                        <div className='text-center'>
                            <h5 className='border-bottom border-dark d-inline px-2 mb-2'>Theo thể loại sản phẩm:</h5>
                            {
                                statisticPost.map((item, index) => (
                                    <div key={index} className='row py-2'>
                                        <div className='col-3'></div>
                                        <div className='col-3 text-end'><strong>{item.categoryProduct.name}:</strong></div>
                                        <div className='col-3 text-start fw-bold'>{item.amount}</div>
                                        <div className='col-3'></div>
                                    </div>
                                ))

                            }
                            <div className='row py-2'>
                                <div className='col-3'></div>
                                <div className='col-3 text-end'><strong>Tổng:</strong></div>
                                <div className='col-3 text-start fw-bold'>{totalPost}</div>
                                <div className='col-3'></div>
                            </div>

                        </div>
                    </div>

                    {/* Thống kê kiểm duyệt */}
                    <div className={'col-5 mx-4 my-4 border rounded p-4'} style={{ backgroundColor: "rgb(220,219,219)" }}>
                        <h3 className='text-center'>Kiểm duyệt</h3>
                        <div className='text-center'><h5 className='border-bottom border-dark d-inline px-2 mb-2'>Thông tin:</h5>
                            <div className='text-center'>
                                <div className='row py-2'>
                                    <div className='col-2'></div>
                                    <div className='col-5 text-end'><strong>Duyệt tự động:</strong></div>
                                    <div className='col-3 text-start fw-bold'>{statisticCensor.acceptByAI}</div>
                                    <div className='col-2'></div>

                                </div>

                                <div className='row py-2'>
                                    <div className='col-2'></div>
                                    <div className='col-5 text-end'><strong>Khóa tự động:</strong></div>
                                    <div className='col-3 text-start fw-bold'>{statisticCensor.rejectByAI}</div>
                                    <div className='col-2'></div>
                                </div>

                                <div className='row py-2'>
                                    <div className='col-2'></div>
                                    <div className='col-5 text-end'><strong>Duyệt thủ công:</strong></div>
                                    <div className='col-3 text-start fw-bold'>{statisticCensor.acceptByAdmin}</div>
                                    <div className='col-2'></div>
                                </div>

                                <div className='row py-2'>
                                    <div className='col-2'></div>
                                    <div className='col-5 text-end'><strong>Khóa thủ công:</strong></div>
                                    <div className='col-3 text-start fw-bold'>{statisticCensor.rejectByAdmin}</div>
                                    <div className='col-2'></div>
                                </div>

                                <div className='row py-2'>
                                    <div className='col-2'></div>
                                    <div className='col-5 text-end'><strong>Tổng lượt kiểm duyệt:</strong></div>
                                    <div className='col-3 text-start fw-bold'>{statisticCensor.total}</div>
                                    <div className='col-2'></div>
                                </div>

                                <div className='row py-2'>
                                    <div className='col-2'></div>
                                    <div className='col-5 text-end'><strong>Tổng lượt đã kiểm duyệt:</strong></div>
                                    <div className='col-3 text-start fw-bold'>{statisticCensor.censored}</div>
                                    <div className='col-2'></div>
                                </div>

                                <div className='row py-2'>
                                    <div className='col-2'></div>
                                    <div className='col-5 text-end'><strong>Tổng lượt chưa kiểm duyệt:</strong></div>
                                    <div className='col-3 text-start fw-bold'>{statisticCensor.total - statisticCensor.censored}</div>
                                    <div className='col-2'></div>
                                </div>
                            </div></div>

                    </div>

                    {/* Thống kê trao đổi */}
                    <div className={'col-5 mx-4 my-4 border rounded p-4'} style={{ backgroundColor: "rgb(220,219,219)" }}>
                        <h3 className='text-center'>Trao đổi</h3>
                        <div className='text-center'><h5 className='border-bottom border-dark d-inline px-2 mb-2'>Theo trạng thái:</h5>
                            <div className='text-center'>
                                {
                                    statisticExchange.map((item, index) => (
                                        <div className='row py-2'>
                                            <div className='col-2'></div>
                                            <div className='col-5 text-end'><strong>{item.status}:</strong></div>
                                            <div className='col-3 text-start fw-bold'>{item.amount}</div>
                                            <div className='col-2'></div>
                                        </div>
                                    ))
                                }
                                <div className='row py-2'>
                                    <div className='col-2'></div>
                                    <div className='col-5 text-end'><strong>Tổng:</strong></div>
                                    <div className='col-3 text-start fw-bold'>{totalExchange}</div>
                                    <div className='col-2'></div>
                                </div>

                            </div></div>

                    </div>

                    {/* Thống kê người dùng */}
                    <div className={'col-5 mx-4 my-4 border rounded p-4'} style={{ backgroundColor: "rgb(220,219,219)" }}>
                        <h3 className='text-center'>Người dùng</h3>
                        <div className='text-center'><h5 className='border-bottom border-dark d-inline px-2 mb-2'>Theo vai trò:</h5>
                            <div className='text-center'>
                                {
                                    statisticUser.map((item, index) => (
                                        <div className='row py-2'>
                                            <div className='col-2'></div>
                                            <div className='col-5 text-end'><strong>{item.label}:</strong></div>
                                            <div className='col-3 text-start fw-bold'>{item.amount}</div>
                                            <div className='col-2'></div>
                                        </div>
                                    ))
                                }

                            </div></div>

                    </div>

                </div>
            </div>


        </div>
    );
};

export default StatisticPage;