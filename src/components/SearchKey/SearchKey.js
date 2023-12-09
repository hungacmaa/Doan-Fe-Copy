import React, {useEffect, useState} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import Post from "../HomePage/Post";
import {getAllPosts} from "../../service/postService";
import _ from "lodash";

const SearchKey = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams] = useSearchParams();
    const key = searchParams.get("key");

    useEffect(() => {
        const data = {
            title: key.toLowerCase()
        }
        getAllPosts(currentPage - 1, 12, data).then(response => {
            setPosts(response.data.content);
            setTotalPages(response.data.totalPages);
        }).catch(error => console.log(error))
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage, key])

    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    return (
        <div className="container">
            {!_.isEmpty(posts) ?
                <>
                    <h2 className="text-center m-5">Danh sách sản phẩm trao đổi với từ khóa: {key}</h2>
                    <Post posts={posts} totalPages={totalPages} changePage={changePage}/>
                </>
                :
                <div className="text-center min-vh-100">
                    <div className="text-danger fs-5">
                        Không tìm thấy bài viết với từ khóa: {key}
                    </div>
                    <Link to="/" className="btn btn-lg btn-primary mt-5 py-3">
                        <i className="fa-solid fa-house-chimney me-3"></i>
                        Trang chủ
                    </Link>
                </div>
            }
        </div>
    );
};

export default SearchKey;