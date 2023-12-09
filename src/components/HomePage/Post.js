import React from 'react';
import _ from 'lodash';
import {Pagination} from "@mui/material";
import {Link} from "react-router-dom";

const Post = ({posts, totalPages, changePage}) => {
    return (
        <div className="container">
            <div className="row g-4 min-vh-100">
                {
                    !_.isEmpty(posts) ?
                        posts.map(post => {
                            return (
                                <div className="col-3" key={post.id}>
                                    <div className="border rounded overflow-hidden">
                                        <Link to={`/posts/${post.id}`} className="nav-link">
                                            <div className="position-relative overflow-hidden">
                                                <div>
                                                    <img className="img-thumbnail" src={post.avatar} alt=""
                                                         style={{aspectRatio: '1/1'}}/>
                                                </div>
                                            </div>
                                            <div className="pt-4 px-3">
                                                <h5 className="mb-2 text-center text-truncate">{post.title}</h5>
                                                <p className="text-truncate mb-1">
                                                    <i className="fa-solid fa-user me-2"></i>
                                                    Người đăng: {post.account.username}
                                                </p>
                                                <p className="text-truncate mb-1">
                                                    <i className="fa-solid fa-table-list me-2"></i>
                                                    {post.requirement}
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <p className="text-truncate">
                                                        <i className="fa fa-map-marker-alt me-2 color-primary"></i>
                                                        {post.address}
                                                    </p>
                                                    <p className="d-flex align-items-center">
                                                        <i className="fa-regular fa-eye me-2"></i>
                                                        {post.countView}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="text-center text-danger fs-5 fw-medium">
                            Không có sản phẩm nào phù hợp
                        </div>
                }
            </div>
            {totalPages > 0 &&
                <div className="mt-5 d-flex justify-content-center">
                    <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                onChange={changePage} color="primary"/>
                </div>
            }
        </div>
    )
};

export default Post;