import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './sidebar.scss';

const Sidebar = () => {
    const account = useSelector(state => state.myState.account);

    return (
        <div
            className="col-3 border-end py-3 bg-light">
            <aside className="left-sidebar" style={{ height: '80vh' }}>
                <div>
                    <nav className="list-group row">
                        <ul id="sidebarnav">
                            <li className="px-3 py-2">
                                <NavLink to="/account/information"
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-user me-3"></i>
                                    Thông tin cá nhân
                                </NavLink>
                            </li>
                            <li className="px-3 py-2">
                                <NavLink to="/account/change-password"
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-rotate me-3"></i>
                                    <span className="hide-menu">Đổi mật khẩu</span>
                                </NavLink>
                            </li>

                            <li className="px-3 py-2">
                                <NavLink to="/account/report-history"
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="fa-solid fa-shield-cat me-3"></i>
                                    <span className="hide-menu">Lịch sử báo cáo bài viết</span>
                                </NavLink>
                            </li>
                            
                            {
                                account.role?.name === 'ROLE_USER' ?
                                    <>
                                        <li className="px-3 py-2">
                                            <NavLink to="/account/exchange-history"
                                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                                <i className="fa-solid fa-clock-rotate-left me-3"></i>
                                                <span className="hide-menu">Lịch sử trao đổi</span>
                                            </NavLink>
                                        </li>
                                        <li className="px-3 py-2">
                                            <NavLink to="/account/manage-posts-user"
                                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                                <i className="fa-solid fa-rectangle-list me-3"></i>
                                                <span className="hide-menu">Quản lý các bài đăng của bạn</span>
                                            </NavLink>
                                        </li>
                                        {/* <li className="px-3 py-2">
                                        <NavLink to="/account/manage-iso-user"
                                                 className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                            <i className="fa-solid fa-rectangle-list me-3"></i>
                                            <span className="hide-menu">Quản lý các món hàng bạn tìm kiếm</span>
                                        </NavLink>
                                    </li> */}

                                    </>
                                    :
                                    account.role?.name === 'ROLE_ADMIN' ?
                                        <>
                                            <li className="px-3 py-2">
                                                <NavLink to="/account/manage-posts-admin"
                                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                                    <i class="fa-solid fa-signs-post me-3"></i>
                                                    <span className="hide-menu">Quản lý các bài đăng</span>
                                                </NavLink>
                                            </li>

                                            <li className="px-3 py-2">
                                                <NavLink to="/account/manage-users"
                                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                                    <i className="fa-solid fa-address-card me-3"></i>
                                                    <span className="hide-menu">Quản lý các người dùng</span>
                                                </NavLink>
                                            </li>

                                            <li className="px-3 py-2">
                                                <NavLink to="/account/manage-product-category"
                                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                                    <i class="fa-solid fa-list me-3"></i>
                                                    <span className="hide-menu">Quản lý thể loại sản phẩm</span>
                                                </NavLink>
                                            </li>

                                            <li className="px-3 py-2">
                                                <NavLink to="/account/manage-censors"
                                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                                    <i class="fa-solid fa-list-check me-3"></i>
                                                    <span className="hide-menu">Kiểm duyệt</span>
                                                </NavLink>
                                            </li>

                                            <li className="px-3 py-2">
                                                <NavLink to="/account/manage-statistics"
                                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                                    <i class="fa-solid fa-chart-simple me-3"></i>
                                                    <span className="hide-menu">Thống kê</span>
                                                </NavLink>
                                            </li>
                                        </>
                                        :
                                        null
                            }
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;