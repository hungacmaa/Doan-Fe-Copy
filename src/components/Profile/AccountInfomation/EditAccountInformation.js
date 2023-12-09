import React, {useRef, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {editAccountInfoSchema} from "../../../validate/validate";
import AvatarUpload from "./Avatar/AvatarUpload";
import {editAccountInformation} from "../../../service/accountService";
import Swal from "sweetalert2";
import {Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {editAccount} from "../../../redux/reducer/accountSlice";

const EditAccountInformation = ({accountInfo}) => {
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarURL, setAvatarURL] = useState(accountInfo.avatar ? accountInfo.avatar : "");
    const [show, setShow] = useState(false);

    const account = useSelector(state => state.myState.account);
    const dispatch = useDispatch();

    const avatarRef = useRef(null);

    const handleChangeAvatar = (event, values) => {
        const file = event.target.files[0];
        setAvatarFile(file);
        values.avatar = file.name;
        if (avatarRef) avatarRef.current.value = null;
    }

    const handleEditAccountInfo = (values) => {
        const data = {...accountInfo, ...values};
        data.avatar = avatarURL;
        editAccountInformation(accountInfo.id, data).then(response => {
            const accountEdit = {
                ...account,
                avatar: avatarURL,
                phone:data.phone,
                name: data.name,
                address: data.address
            }
            dispatch(editAccount(accountEdit));
            localStorage.setItem("account", JSON.stringify(accountEdit));
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thông tin thành công!',
                showConfirmButton: false,
                timer: 1500
            }).then();
        }).catch(error => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Cập nhật thông tin thất bại!',
                showConfirmButton: false,
                timer: 1500
            }).then();
        })
        handleCloseModal();
    }

    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => {
        setShow(true);
        setAvatarURL(accountInfo.avatar);
    }
    return (
        <>
            <div className="mt-3 text-center">
                <button className="btn btn-lg btn-primary" onClick={handleShowModal}>
                    Sửa thông tin
                </button>
            </div>

            <Modal show={show} onHide={handleCloseModal} size="lg">
                <Formik
                    initialValues={{
                        name: accountInfo.name ? accountInfo.name : "",
                        phone: accountInfo.phone ? accountInfo.phone : "",
                        avatar: accountInfo.avatar ? accountInfo.avatar : "",
                        address: accountInfo.address ? accountInfo.address : "",
                    }}
                    validationSchema={editAccountInfoSchema}
                    onSubmit={values => {
                        handleEditAccountInfo(values);
                    }}
                >
                    {({values}) => (
                        <Form className="px-3 py-2">
                            <Modal.Header closeButton>
                                <h3 className="m-0 text-uppercase text-primary">Thay đổi thông tin</h3>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="mb-3 col-6">
                                        <label htmlFor="name" className="form-label">
                                            Họ và tên <span className="text-danger">*</span>
                                        </label>
                                        <Field type="text" className="form-control" id="name"
                                               placeholder="Nhập họ và tên" name="name"/>
                                        <ErrorMessage name="name" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label htmlFor="phone" className="form-label">
                                            Số điện thoại <span className="text-danger">*</span>
                                        </label>
                                        <Field type="text" className="form-control" id="phone"
                                               placeholder="Nhập số điện thoại" name="phone"/>
                                        <ErrorMessage name="phone" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="col-6 form-group mb-3">
                                        <label className="form-label" htmlFor="address">
                                            Địa chỉ <span className="text-danger">*</span>
                                        </label>
                                        <Field className="form-control" id="address" type="text"
                                               placeholder="Nhập địa chỉ" name="address"/>
                                        <ErrorMessage name="address" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="col-6 col-sm-6 mb-3">
                                        <label htmlFor="avatar" className="form-label">
                                            Ảnh đại diện <span className="text-danger">*</span>
                                        </label>
                                        <input type="file" className="form-control" id="avatar" name="avatar"
                                               ref={avatarRef}
                                               onChange={event => handleChangeAvatar(event, values)}/>
                                        <ErrorMessage name="avatar" className="text-danger" component="small"/>
                                        <AvatarUpload file={avatarFile} avatarURL={avatarURL}
                                                      setAvatarURL={setAvatarURL}
                                                      setAvatarFile={setAvatarFile} values={values}/>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Đóng
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Cập nhật
                                </button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default EditAccountInformation;