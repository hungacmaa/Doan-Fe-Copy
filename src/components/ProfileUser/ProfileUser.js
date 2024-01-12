import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {useNavigate, useParams} from "react-router-dom";
import image_user from "../../image/user-image.png";
import {Table} from "reactstrap";
import {getAccountById, getAllPostsByAccountId} from "../../service/accountService";
import Post from "../HomePage/Post";
import {useSelector} from "react-redux";
import Swal from "sweetalert2";

const ProfileUser = () => {

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [currentPageSearch, setCurrentPageSearch] = useState(1);
    const [totalPagesSearch, setTotalPagesSearch] = useState(1);
    const [postsSearch, setPostsSearch] = useState([]);
    const [accountInfo, setAccountInfo] = useState({});
    const {userId} = useParams();
    const account = useSelector(state => state.myState.account);
    const navigate = useNavigate();

    useEffect(() => {
        if (!account.id) {
            Swal.fire({
                title: 'Vui lòng đăng nhập để xem chi tiết!',
                icon: 'warning',
                showConfirmButton: false,
                timer: 1500
            }).then();
            navigate("/login");
        }
    }, [])

    useEffect(() => {
        if (account.id) {
            getAccountById(userId).then(response => {
                setAccountInfo(response.data);
            }).catch(error => {
                console.log(error)
            })
        }
    }, [userId])

    useEffect(() => {
        if (userId) {
            getAllPostsByAccountId(userId, currentPage - 1, 8, {category: 'Sản phẩm muốn trao đổi'}).then(response => {
                setPosts(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch(error => console.log(error));

            getAllPostsByAccountId(userId, currentPage - 1, 5, {category: 'Sản phẩm cần tìm trao đổi'}).then(response => {
                setPostsSearch(response.data.content);
                setTotalPagesSearch(response.data.totalPages);
            }).catch(error => console.log(error));
        }
    }, [userId, currentPage, currentPageSearch])

    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    const changePageSearch = (e, value) => {
        setCurrentPageSearch(value);
    }
    return (
        <div className="container">
            <h2 className="text-center text-uppercase mb-5 mt-5">
                Chi tiết người dùng
            </h2>
            <div className="row">
                <div className="col-3 text-center">
                    <img src={accountInfo.avatar ? accountInfo.avatar : image_user} alt="" height={200}
                         width={200}
                         style={{"borderRadius": "50%", border: "4px solid grey"}}/>
                </div>
                <div className="col-9">
                    <Table hover>
                        <thead>
                        <tr>
                            <th>Username:</th>
                            <td>{accountInfo.username}</td>
                        </tr>
                        <tr>
                            <th>Họ và tên:</th>
                            <td>{accountInfo.name}</td>
                        </tr>
                        <tr>
                            <th>Số điện thoại:</th>
                            <td>{accountInfo.phone}</td>
                        </tr>
                        <tr>
                            <th>Trạng thái:</th>
                            <td>{accountInfo.status}</td>
                        </tr>
                        </thead>
                    </Table>
                </div>
                {!_.isEmpty(posts) &&
                    <>
                        <h2 className="text-center m-5">Danh sách bài đăng</h2>
                        <Post posts={posts} totalPages={totalPages} changePage={changePage}/>
                    </>
                }

                {/* {!_.isEmpty(postsSearch) &&
                    <>
                        <h2 className="text-center m-5">Danh sách sản phẩm cần tìm trao đổi</h2>
                        <Post posts={postsSearch} totalPages={totalPagesSearch} changePage={changePageSearch}/>
                    </>
                } */}
            </div>
        </div>
    );
};

export default ProfileUser;