import React, {useEffect, useState, useRef} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import PostUpload from "./PostUpload";
import _ from "lodash";
import axios from "axios";
import Swal from "sweetalert2";
import ImageItemEdit from "./ImageItemEdit";
import ImageItem from "./ImageItem";


const CreatePost = () => {
    const navigate = useNavigate();
    const {account} = useSelector(state => state.myState);
    const [avatar, setAvatar] = useState('');
    const [imagesFile, setImagesFile] = useState([]);
    const [avatarURL, setAvatarURL] = useState("");
    const [imagesURL, setImagesURL] = useState([])
    const [imagesURLEdit, setImagesURLEdit] = useState([]);
    const [imagesURLDelete, setImagesURLDelete] = useState([]);
    const [isImageUploaded, setIsImageUploaded] = useState(false);


    const avatarRef = useRef(null);
    const imagesRef = useRef(null);
    const handleAvatarChange = (event, values) => {
        const file = event.target.files[0];
        setAvatar(file);
        values.avatar = file.name;
        setIsImageUploaded(true);
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Vui lòng nhập tên sản phẩm'),
        avatar: Yup.mixed().required('Vui lòng chọn ảnh hiển thị'),
    });
    const handleImageChange = (event, values) => {
        values.images = 'is valid';
        setImagesFile([...imagesFile, ...event.target.files]);

    };

    const handleOnSubmit = (values) => {
            let postDTO = {
                title: values.title,
                category: values.category,
                description: values.description,
                requirement: values.requirement,
                address: values.address,
                avatar: avatarURL,
                images: imagesURL,
            }

            axios.post("http://localhost:8080/api/posts/createPost", postDTO,
                {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    },
                }).then(() => {
                    Swal.fire(
                        'Thành công!',
                        'Bài post của bạn đã được tải lên!',
                        'success'
                    ).then(() => navigate("/"))
                }
            ).catch(err => {
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Thất bại...',
                        text: 'Bài post của bạn đăng tải thất bại!',
                    })
                }
            )
    }
    return (
        <>
            <div className="container " style={{marginTop: "50px"}}>
                <h2 className="text-center text-uppercase mb-5">Đăng bài Post trao đổi đồ</h2>
                <Formik
                    initialValues={{
                        title: '',
                        category: '',
                        description: '',
                        requirement: '',
                        address: account ? account.address : '',
                        avatar: avatar,
                    }}
                    validationSchema={validationSchema}

                    onSubmit={values => {
                        handleOnSubmit(values)
                    }}>
                    {({values}) => (

                        <Form>
                            <div className="row" style={{marginLeft: "20%"}}>

                                <div className="mb-3 col-5">
                                    <label htmlFor="name" className="form-label">Tên sản phẩm (<span
                                        className="text-danger">*</span>)</label>
                                    <Field type="text" className="form-control" id="name" placeholder="Nhập sản phẩm"
                                           name="title"/>
                                    <ErrorMessage name="title" className="text-danger" component="div"/>
                                </div>

                                <div className="mb-3 col-5">
                                    <label htmlFor="name" className="form-label">Loại sản phẩm</label>
                                    <Field type="text" className="form-control" placeholder="Nhập thể loại"
                                           name="category"/>
                                </div>

                                <div className="col-md-5 mb-3">
                                    <label htmlFor="description" className="form-label">Địa chỉ muốn trao
                                        đổi</label>
                                    <Field as="textarea" type="text" className="form-control"
                                           name="address" placeholder="Nhập rõ địa chỉ thuận tiện cho việc trao đổi"/>
                                </div>
                                <div className="col-md-5 form-group mb-3">
                                    <label htmlFor="description" className="form-label">Yêu cầu/ Mong muốn </label>
                                    <Field as="textarea" type="text" className="form-control"
                                           name="description" placeholder="Nhập yêu cầu/ mong muốn của bạn"
                                    />
                                </div>
                                <div className="col-md-5 form-group mb-3">
                                    <label htmlFor="thumbnail" className="form-label">Ảnh hiển thị (<span
                                        className="text-danger">*</span>)</label>
                                    <input type="file" className="form-control" id="avatar" name="avatar"
                                           ref={avatarRef}
                                           hidden={true}
                                           onChange={event => handleAvatarChange(event, values)}/>
                                    <label className={"btn btn-outline-danger"} htmlFor={"avatar"}>Chọn ảnh </label>
                                    <ErrorMessage name="avatar" className="text-danger" component="div"/>
                                    <div>
                                        <PostUpload file={avatar} avatarURL={avatarURL}
                                                    setAvatarURL={setAvatarURL}
                                                    setAvatarFile={setAvatar} values={values}/>
                                    </div>
                                </div>
                                <div className="col-md-5 form-group mb-3">
                                    <label htmlFor="images" className="form-label">Ảnh sản phẩm</label>
                                    <input type="file" className="form-control" id="images" name="images"
                                           multiple={true}
                                           ref={avatarRef}
                                           hidden={true}
                                           onChange={event => handleImageChange(event, values)}/>
                                    <label className="btn btn-outline-danger" htmlFor="images">Chọn ảnh</label>
                                    <div>
                                        {!_.isEmpty(imagesFile) && imagesFile.map(file => (
                                            <ImageItem file={file} setImagesFile={setImagesFile}
                                                       setImagesURL={setImagesURL} key={file.name}
                                                       imagesFile={imagesFile} values={values} houseId={1}/>
                                        ))}
                                    </div>

                                </div>
                                <div className="col-md-3"></div>
                                <div className="my-3 col-md-5">
                                    <button type="submit" className="btn btn-lg btn-primary me-3"
                                            style={{minWidth: '120px'}}
                                            disabled={!isImageUploaded} >
                                        Thêm bài post
                                    </button>
                                    <Link to="/" className="btn btn-lg btn-secondary"
                                          style={{minWidth: '120px'}}>
                                        Hủy
                                    </Link>
                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>

            </div>

        </>
    )
        ;
};

export default CreatePost;