import React, {useEffect, useState, useRef} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import _ from 'lodash';
import Swal from 'sweetalert2';
import ImageItem from "./ImageItem";
import ImageItemEdit from "./ImageItemEdit";
import {useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getAllImagesByPostId} from "../../../../service/imageService";
import {getPostById} from "../../../../service/postService";
import {savePostSchema} from "../../../../validate/validate";
import AvatarUpload from "../../AccountInfomation/Avatar/AvatarUpload";
import {createPost, editPost} from "../../../../service/accountService";
import {getAllCategories} from "../../../../service/categoryService";

const SavePost = () => {
    const [avatarURL, setAvatarURL] = useState("");
    const [imagesURL, setImagesURL] = useState([]);
    const [imagesURLEdit, setImagesURLEdit] = useState([]);
    const [imagesURLDelete, setImagesURLDelete] = useState([]);
    const [avatarFile, setAvatarFile] = useState(null);
    const [imagesFile, setImagesFile] = useState([]);
    const [categories, setCategories] = useState([]);
    const [post, setPost] = useState({});
    const account = useSelector(state => state.myState.account);
    const navigate = useNavigate();

    const {postId} = useParams();

    const avatarRef = useRef();
    const imagesRef = useRef();

    useEffect(() => {
        if (_.isEmpty(account)){
            navigate("/403");
            return;
        }

        getAllCategories().then(response => {
            setCategories(response.data);
        }).catch(error => console.log(error))
        const callAPI = async () => {
            if (postId) {
                const imagesPostData = await getAllImagesByPostId(postId);
                setImagesURLEdit(imagesPostData.data);

                const postData = await getPostById(postId);
                setAvatarURL(postData.data.avatar);
                setPost(postData.data);
            } else {
                setPost({
                    title: "",
                    categoryPost: "",
                    categoryProduct: "",
                    address: "",
                    description: "",
                    requirement: "",
                    avatar: "",
                    images: ""
                })
            }
        }
        callAPI().then();
    }, [])

    const handleAvatarFile = (event, values) => {
        values.avatar = 'is valid';
        setAvatarFile(event.target.files[0]);
        if (avatarRef) avatarRef.current.value = null;
    }

    const handleImagesFile = (event, values) => {
        values.images = 'is valid';
        setImagesFile([...imagesFile, ...event.target.files]);
        if (imagesRef) imagesRef.current.value = null;
    }

    const handleSavePost = (values) => {
        const data = {
            ...values,
            categoryProduct: {id: values.categoryProduct}
        };
        data.avatar = avatarURL;
        data.account = {id: account.id};
        if (postId) {
            data.id = parseInt(postId);
            data.createdAt = post.createdAt;
            data.status = post.status;
            data.countView = post.countView;
            data.images = [...imagesURLEdit, ...imagesURL];
            data.imagesDelete = imagesURLDelete;
            editPost(data).then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật bài viết thành công !',
                    showConfirmButton: false,
                    timer: 1500
                }).then();
                navigate("/account/manage-posts-user");
            }).catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Cập nhật bài viết thất bại !',
                    showConfirmButton: false,
                    timer: 1500
                }).then();
            })
        } else {
            data.images = imagesURL;
            createPost(data).then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm mới bài viết thành công !',
                    showConfirmButton: false,
                    timer: 1500
                }).then();
                navigate("/account/manage-posts-user");
            }).catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Thêm mới bài viết thất bại !',
                    showConfirmButton: false,
                    timer: 1500
                }).then();
            })
        }
    }

    return (
        <div className="container">
            {!_.isEmpty(post) &&
                <Formik
                    initialValues={{
                        title: post.title,
                        categoryPost: post.categoryPost,
                        categoryProduct: post.categoryProduct?.id,
                        address: post.address,
                        description: post.description,
                        requirement: post.requirement,
                        avatar: avatarURL ? "is valid" : "",
                        images: !_.isEmpty(imagesURLEdit) ? "is valid" : ""
                    }}
                    validationSchema={savePostSchema}
                    onSubmit={values => {
                        handleSavePost(values);
                    }}>
                    {({values}) => (
                        <Form>
                            <div className="row">
                                <h2 className="text-center text-uppercase mb-5">{postId ? "Sửa đổi thông tin bài viết" : "Thêm bài viết mới"}</h2>
                                <div className="mb-3 col-3">
                                    <label htmlFor="title" className="form-label">
                                        Tên bài viết <span className="text-danger">*</span>
                                    </label>
                                    <Field type="text" className="form-control" id="title" placeholder="Nhập tên bài viết"
                                           name="title"/>
                                    <ErrorMessage name="title" className="text-danger" component="small"/>
                                </div>

                                <div className="mb-3 col-3">
                                    <label htmlFor="categoryProduct" className="form-label">
                                        Danh mục sản phẩm <span className="text-danger">*</span>
                                    </label>
                                    <Field as="select" className="form-select" name="categoryProduct">
                                        <option value="">---Vui lòng chọn---</option>
                                        {!_.isEmpty(categories) && categories.map(item => (
                                            <option value={item.id} key={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="categoryProduct" className="text-danger" component="small"/>
                                </div>

                                <div className="mb-3 col-3">
                                    <label htmlFor="categoryPost" className="form-label">
                                        Danh mục bài viết <span className="text-danger">*</span>
                                    </label>
                                    <Field as="select" className="form-select" id="categoryPost" name="categoryPost">
                                        <option value="">---Vui lòng chọn---</option>
                                        <option value="Sản phẩm muốn trao đổi">Sản phẩm muốn trao đổi</option>
                                        <option value="Sản phẩm cần tìm trao đổi">Sản phẩm cần tìm trao đổi</option>
                                    </Field>
                                    <ErrorMessage name="categoryPost" className="text-danger" component="small"/>
                                </div>

                                <div className="col-3 mb-3">
                                    <label className="form-label" htmlFor="address">
                                        Địa chỉ <span className="text-danger">*</span>
                                    </label>
                                    <Field className="form-control" id="address" type="text" name="address"
                                           placeholder="Nhập địa chỉ chi tiết"/>
                                    <ErrorMessage name="address" className="text-danger" component="small"/>
                                </div>

                                <div className="col-6 mb-3">
                                    <label className="form-label" htmlFor="description">
                                        Mô tả sản phẩm <span className="text-danger">*</span>
                                    </label>
                                    <Field as="textarea" className="form-control" id="description" name="description"
                                           placeholder="Nhập mô tả sản phẩm"/>
                                    <ErrorMessage name="description" className="text-danger" component="small"/>
                                </div>

                                <div className="col-6 mb-3">
                                    <label className="form-label" htmlFor="requirement">
                                        Yêu cầu <span className="text-danger">*</span>
                                    </label>
                                    <Field as="textarea" className="form-control" id="requirement" type="number"
                                           name="requirement" placeholder="Nhập yêu cầu"/>
                                    <ErrorMessage name="requirement" className="text-danger" component="small"/>
                                </div>

                                <div className="col-6 mb-3">
                                    <label htmlFor="avatar" className="form-label">
                                        Ảnh đại diện <span className="text-danger">*</span>
                                    </label>
                                    <input type="file" className="form-control" id="avatar" name="avatar"
                                           ref={avatarRef} accept={"image/jpeg ,image/png"}
                                           onChange={(event) => handleAvatarFile(event, values)}/>
                                    <ErrorMessage name="avatar" className="text-danger" component="small"/>
                                </div>

                                <div className="col-6 mb-3">
                                    <label htmlFor="images" className="form-label">
                                        Ảnh giới thiệu chi tiết <span className="text-danger">*</span>
                                    </label>
                                    <input type="file" className="form-control" id="images" name="images"
                                           multiple={true}
                                           onChange={(event) => handleImagesFile(event, values)} ref={imagesRef} accept={"image/jpeg ,image/png"}/>
                                    <ErrorMessage name="images" className="text-danger" component="small" />
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    <AvatarUpload avatarURL={avatarURL} file={avatarFile} setAvatarURL={setAvatarURL}
                                                  setAvatarFile={setAvatarFile} values={values} />
                                </div>

                                <div className="col-md-6 form-group mb-3">
                                    {!_.isEmpty(imagesURLEdit) && imagesURLEdit.map((item, index) => (
                                        <ImageItemEdit key={item.id} index={index} url={item.url}
                                                       setImageURLEdit={setImagesURLEdit} values={values}
                                                       imagesFile={imagesFile} setImagesURLDelete={setImagesURLDelete}/>
                                    ))}

                                    {!_.isEmpty(imagesFile) && imagesFile.map(file => (
                                        <ImageItem file={file} setImagesFile={setImagesFile}
                                                   setImagesURL={setImagesURL} key={file.name}
                                                   imagesFile={imagesFile} values={values} postId={postId}/>
                                    ))}

                                </div>

                                <div className="text-center my-3">
                                    <button type="submit" className="btn btn-lg btn-primary me-3"
                                            style={{minWidth: '120px'}}>
                                        {postId ? "Cập nhật" : "Thêm bài viết"}
                                    </button>
                                    <Link to="/account/manage-posts-user" className="btn btn-lg btn-secondary"
                                    style={{minWidth: '120px'}}>
                                        Hủy
                                    </Link>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            }
        </div>
    );
};

export default SavePost;