import React, {useEffect, useState} from 'react';
import Post from "./Post";
import {getAllPosts} from "../../service/postService";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import banner from '../../image/banner.jpg';
import {getAllCategories} from "../../service/categoryService";

const HomePage = () => {
    const {account} = useSelector(state => state.myState);
    const [categoryProductName, setCategoryProductName] = useState("");
    const [sort, setSort] = useState("createdAt-desc");
    const [categories, setCategories] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [render, setRender] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data = {
            status: 'Chưa trao đổi',
            categoryPost: 'Sản phẩm muốn trao đổi',
            categoryProductName,
            sort,
            startDate,
            endDate
        }
        getAllPosts(currentPage - 1, 12, data).then(response => {
            setPosts(response.data.content);
            setTotalPages(response.data.totalPages);
        }).catch(error => console.log(error))
        window.scrollTo({
            top: 500,
            behavior: "smooth"
        })
    }, [currentPage, render])

    useEffect(() => {
        getAllCategories().then(response => {
            setCategories(response.data);
        }).catch(error => console.log(error))

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])

    const handleClick = () => {
        navigate("/create-post");
        window.scrollTo(0, 0);
    }

    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    const handleSearch = () => {
        setCurrentPage(1);
        setRender(!render);
    }

    return (
        <>
            {!_.isEmpty(account) && account.role.name === "ROLE_USER" &&
                <button onClick={handleClick} className="flash-button">
                    Thêm bài viết
                </button>
            }
            <div className="image-container">
                <img className="img-fluid w-100" src={banner} style={{height: '350px'}} alt=""/>
            </div>
            <div className="container">
                <h2 className="text-center m-5">Danh sách sản phẩm trao đổi</h2>
                <div className="mb-5 px-4 pb-4 pt-3"
                     style={{backgroundColor: "rgb(0,185,142)", borderRadius: "8px", position: 'sticky', top: '90px', zIndex: '100'}}>
                    <div className="row g-2">
                        <div className="col-3">
                            <label className="form-label d-block text-center fw-medium text-white"
                                   htmlFor="categoryProduct" style={{fontSize: '18px'}}>
                                Danh mục sản phẩm
                            </label>
                            <select id="categoryProduct" className="form-select border-0 py-3"
                                    onChange={event => setCategoryProductName(event.target.value)}>
                                <option value="">Tất cả</option>
                                {!_.isEmpty(categories) && categories.map(item => (
                                    <option value={item.name} key={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-3">
                            <label className="form-label d-block text-center fw-medium text-white"
                                   htmlFor="sort" style={{fontSize: '18px'}}>
                                Số lượt xem
                            </label>
                            <select id="sort" className="form-select border-0 py-3"
                                    onChange={event => setSort(event.target.value)}>
                                <option value="createdAt-desc">Mặc định</option>
                                <option value="countView-asc">Tăng dần</option>
                                <option value="countView-desc">Giảm dần</option>
                            </select>
                        </div>

                        <div className="col-2">
                            <label className="form-label d-block text-center mb-2 fw-medium text-white"
                                   htmlFor="startDate" style={{fontSize: '18px'}}>
                                Ngày bắt đầu
                            </label>
                            <input id="startDate" type="date" className="form-control border-0 py-3"
                                   onChange={event => setStartDate(event.target.value)}/>
                        </div>

                        <div className="col-2">
                            <label className="form-label d-block text-center mb-2 fw-medium text-white"
                                   htmlFor="endDate" style={{fontSize: '18px'}}>
                                Ngày kết thúc
                            </label>
                            <input id="endDate" type="date" className="form-control border-0 py-3"
                                   onChange={event => setEndDate(event.target.value)}/>
                        </div>
                        <div className="col-2 text-end">
                            <label className="form-label d-block text-center mb-2 fw-medium"
                                   style={{color: 'transparent', fontSize: '18px'}}>
                                Tìm kiếm
                            </label>
                            <button className="btn btn-dark border-0 py-3 px-4"
                                    onClick={handleSearch}>
                                Tìm kiếm
                                <i className="fa-solid fa-magnifying-glass ms-2"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <Post posts={posts} totalPages={totalPages} changePage={changePage}/>
            </div>
        </>
    );
};

export default HomePage;