import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";

import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {changeAccountPassword} from "../../../service/accountService";
import {changePasswordSchema} from "../../../validate/validate";
import Swal from "sweetalert2";

const ChangePassword = () => {
    const navigate = useNavigate();
    const account = useSelector(state => state.myState.account);

    const handleChangePassword = (data) => {
        changeAccountPassword(account.id, data).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật mật khẩu thành công!',
                showConfirmButton: false,
                timer: 1500
            }).then();
            navigate("/account/information");
        }).catch(error => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Cập nhật mật khẩu thất bại!',
                showConfirmButton: false,
                timer: 1500
            }).then();
        });
    }
    return (
        <div className="col-9">
            <h3 className="text-center text-uppercase  mt-3">Thay đổi mật khẩu</h3>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card border-0 shadow-2-strong" style={{borderRadius: "1rem"}}>
                        <div className="card-body">
                            <Formik
                                initialValues={{
                                    password: '',
                                    newPassword: '',
                                    confirmNewPassword: ''
                                }}
                                validationSchema={changePasswordSchema}
                                onSubmit={(values) => {
                                    handleChangePassword({password: values.newPassword});
                                }}>
                                <Form>
                                    <div className="form-outline mb-4">
                                        <div>
                                            <label className="form-label" htmlFor="password">Mật khẩu cũ <span
                                                className='text-danger'>*</span></label>
                                        </div>
                                        <Field type="text" id="password" name="password"
                                               className="form-control form-control py-2"
                                               placeholder="Nhập mật khẩu hiện tại"/>
                                        <ErrorMessage name='password' className="text-danger" component="small"/>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <div>
                                            <label className="form-label" htmlFor="newPassword">
                                                Mật khẩu mới <span className='text-danger'>*</span>
                                            </label>
                                        </div>
                                        <Field type="password" id="newPassword" name="newPassword"
                                               placeholder="Ví dụ: User12"
                                               className="form-control form-control py-2"/>
                                        <ErrorMessage name='newPassword' className="text-danger" component="small"/>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <div>
                                            <label className="form-label" htmlFor="confirmNewPassword">
                                                Xác nhận mật khẩu mới <span className='text-danger'>*</span>
                                            </label>
                                        </div>
                                        <Field type="password" id="confirmNewPassword"
                                               name="confirmNewPassword"
                                               placeholder="Xác nhận lại mật khẩu mới"
                                               className="form-control form-control py-2"/>
                                        <ErrorMessage name='confirmNewPassword' className="text-danger"
                                                      component="small"/>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-lg btn-primary border-0"
                                                type="submit">
                                            Cập nhật
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChangePassword;