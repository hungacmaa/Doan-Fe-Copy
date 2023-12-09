import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {Table} from "reactstrap";
import {Pagination} from "@mui/material";
import {getAllPosts} from "../../../service/postService";
import {Link, useNavigate} from "react-router-dom";
import {formatDate} from "../../../service/format";
import {getAllCategories} from "../../../service/categoryService";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [username, setUsername] = useState("");
    const [categoryPost, setCategoryPost] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryProductName, setCategoryProductName] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories().then(response => {
            setCategories(response.data);
        }).catch(error => console.log(error))
    }, [])

    useEffect(() => {
        const data = {status, categoryPost, categoryProductName, username}
        getAllPosts(currentPage - 1, 10, data).then(response => {
            setPosts(response.data.content);
            setTotalPages(response.data.totalPages);
        }).catch(error => console.log(error));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage,categoryPost, categoryProductName, status, username])

    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    const handleChangeCategoryPost = (event) => {
        setCategoryPost(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeCategoryProductName = (event) => {
        setCategoryProductName(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
        setCurrentPage(1);
    }

    const showPostDetail = (post) => {
        navigate(`/posts/${post.id}`);
    }
    return (
        <div className="col-9">
            <h3 className="text-uppercase text-center mb-5">Danh sách bài đăng</h3>
            <div className="mb-3 py-4 px-3"
                 style={{backgroundColor: "rgb(220,219,219)"}}>
                <div className='row g-2'>
                    <div className="col-3">
                        <label className="form-label fw-medium">Danh mục bài viết</label>
                        <select className="form-select py-2 border-0"
                                onChange={handleChangeCategoryPost}>
                            <option value="">Tất cả</option>
                            <option value="Sản phẩm muốn trao đổi">Sản phẩm muốn trao đổi</option>
                            <option value="Sản phẩm cần tìm trao đổi">Sản phẩm cần tìm trao đổi</option>
                        </select>
                    </div>

                    <div className="col-3">
                        <label className="form-label fw-medium" htmlFor="categoryProduct">
                            Danh mục sản phẩm
                        </label>
                        <select id="categoryProduct" className="form-select border-0 py-2"
                                onChange={handleChangeCategoryProductName}>
                            <option value="">Tất cả</option>
                            {!_.isEmpty(categories) && categories.map(item => (
                                <option value={item.name} key={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-3">
                        <label className="form-label fw-medium">Trạng thái</label>
                        <select className="form-select py-2 border-0"
                                onChange={handleChangeStatus}>
                            <option value="">Tất cả</option>
                            <option value="Chưa trao đổi">Chưa trao đổi</option>
                            <option value="Chờ trao đổi">Chờ trao đổi</option>
                            <option value="Đã trao đổi">Đã trao đổi</option>
                            <option value="Vô hiệu hóa">Vô hiệu hóa</option>
                        </select>
                    </div>

                    <div className="col-3">
                        <label className="form-label fw-medium">Tìm kiếm theo người đăng</label>
                        <input type="text" className="form-control border-0 py-2"
                               placeholder="Nhập từ khóa tìm kiếm"
                               value={username}
                               onChange={handleChangeUsername}/>
                    </div>
                </div>
            </div>
            <Table hover>
                <thead>
                <tr align="center">
                    <th>STT</th>
                    <th>Tên bài đăng</th>
                    <th>Người đăng</th>
                    <th>Ngày đăng</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody style={{verticalAlign: 'middle'}}>
                {!_.isEmpty(posts) ?
                    posts.map((item, index) => (
                        <tr key={item.id} align="center">
                            <td>{index + 1}</td>
                            <td>
                                <Link to={`/posts/${item.id}`} className="nav-link fw-medium">
                                    {item.title}
                                </Link>
                            </td>
                            <td>{item.account.username}</td>
                            <td>{formatDate(item.createdAt)}</td>
                            <td>{item.status}</td>
                            <td className="d-flex justify-content-center">
                                <button
                                    onClick={() => {
                                        showPostDetail(item)
                                    }}
                                    className="btn border border-primary text-primary"
                                    style={{width: '100px'}}>
                                    Chi tiết
                                </button>
                            </td>
                        </tr>
                    ))
                    :
                    <tr align="center">
                        <td colSpan="6" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                    </tr>
                }
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

export default PostList;