import './register.scss';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from 'yup';
import axios from "axios";
import Swal from "sweetalert2";

function Register() {
    let navigate = useNavigate();
    const [registerError, setRegisterError] = useState('');

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])

    const handleRegister = (values) => {
        const account = {
            username: values.username,
            password: values.password,
            name: values.name,
            address: values.address,
            phone: values.phone
        }

        const createAccount = (account) => {
            axios.post('http://localhost:8080/register', account).then(resp => {
                Swal.fire({
                    title: 'Đăng ký thành công !',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                }).then();
                navigate('/login');
            }).catch(err => {
                setRegisterError(err.response.data)
            })
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    account.latitude = position.coords.latitude;
                    account.longitude = position.coords.longitude;
                    createAccount(account);
                },
                error => {
                    Swal.fire({
                        title: 'Vui lòng bật định vị để đăng ký tài khoản !',
                        icon: 'warning',
                        showConfirmButton: true,
                    }).then();
                }
            );
        } else {
            createAccount(account);
        }
    }

    const checkUsername = (account) => {
        return axios.post('http://localhost:8080/register/check-username', account);
    }

    return (
        <section className="">
            <div className="d-flex align-items-center h-100">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{borderRadius: "15px"}}>
                                <div className="card-body" style={{padding: '10px 40px'}}>
                                    <h2 className="text-uppercase text-center mb-4 mt-2">Đăng ký</h2>
                                    <Formik
                                        initialValues={{
                                            username: '',
                                            password: '',
                                            name: '',
                                            address: '',
                                            phone: '',
                                        }
                                        }
                                        validationSchema={
                                            Yup.object().shape({
                                                username: Yup.string().required('Tài khoản không được để trống!')
                                                    .matches(/^[a-zA-Z0-9]{6,}$/, 'Tài khoản phải có ít nhất 6 kí tự, không chứa kí tự đặc biệt')
                                                    .test("Check username", "Tên đăng nhập đã tồn tại", async (value) => {
                                                        const isExist = await checkUsername({username: value});
                                                        return !isExist.data;
                                                    }),
                                                password: Yup.string().required('Mật khẩu không được để trống!')
                                                    .min(6, 'Mật khẩu phải ít nhất 6 kí tự'),
                                                name: Yup.string().required('Họ tên không được để trống!'),
                                                confirmPassword: Yup.string()
                                                    .required('Mật khẩu không được để trống!')
                                                    .oneOf([Yup.ref('password')], 'Xác nhận mật khẩu không khớp'),
                                                phone: Yup.string().matches(/^(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b$/, 'Đây không phải là số điện thoại')
                                                    .required('Vui lòng không được để trống'),
                                                address: Yup.string().required('Địa chỉ không được để trống!')
                                            })
                                        }
                                        onSubmit={values => {
                                            handleRegister(values);
                                        }
                                        }>
                                            <Form>
                                                <div className="form-outline mb-2">
                                                    <label className="form-label" htmlFor="username">Họ tên <span
                                                        className="text-danger">*</span></label>
                                                    <Field type="text" name="name"
                                                           placeholder="Nhập họ tên"
                                                           className="form-control form-control py-2"/>
                                                    <ErrorMessage name="name" className="text-danger mt-1"
                                                                  component="div"/>
                                                </div>
                                                <div className="form-outline mb-2">
                                                    <label className="form-label" htmlFor="username">Tên đăng nhập <span
                                                        className="text-danger">*</span></label>
                                                    <Field type="text" name="username"
                                                           placeholder="Nhập tài khoản"
                                                           className="form-control form-control py-2"/>
                                                    <ErrorMessage name="username" className="text-danger mt-1"
                                                                  component="div"/>

                                                </div>
                                                <div className="form-outline mb-2">
                                                    <label className="form-label" htmlFor="password">
                                                        Mật khẩu <span className="text-danger">*</span>
                                                    </label>
                                                    <Field type="password" id="password"
                                                           name="password"
                                                           placeholder="Mật khẩu"
                                                           className="form-control form-control py-2"/>

                                                    <ErrorMessage name="password" className="text-danger mt-1"
                                                                  component="div"/>
                                                </div>

                                                <div className="form-outline mb-2">
                                                    <label className="form-label" htmlFor="confirmPassword">
                                                        Xác nhận lại mật khẩu <span className="text-danger">*</span>
                                                    </label>
                                                    <Field type="password" id="confirmPassword" name="confirmPassword"
                                                           placeholder="Xác nhận lại mật khẩu"
                                                           className="form-control form-control py-2"/>
                                                    <ErrorMessage name="confirmPassword" className="text-danger mt-1"
                                                                  component="div"/>
                                                </div>

                                                <div className="form-outline mb-2">
                                                    <label className="form-label" htmlFor="confirmPassword">
                                                        Địa chỉ <span className="text-danger">*</span>
                                                    </label>
                                                    <Field type="text" name="address"
                                                           placeholder="Địa chỉ"
                                                           className="form-control form-control py-2"/>
                                                    <ErrorMessage name="address" className="text-danger mt-1"
                                                                  component="div"/>
                                                </div>

                                                <div className="form-outline mb-2">
                                                    <label className="form-label" htmlFor="confirmPassword">
                                                        Số điện thoại <span className="text-danger">*</span>
                                                    </label>
                                                    <Field type="text" name="phone"
                                                           placeholder="Số điện thoại"
                                                           className="form-control form-control py-2"/>
                                                    <ErrorMessage name="phone" className="text-danger mt-1"
                                                                  component="div"/>
                                                </div>
                                                {registerError && <div className="text-danger">{registerError}</div>}
                                                <div className="d-flex justify-content-center mt-3">
                                                    <button type="submit" className="btn btn-success btn-lg">
                                                        Đăng ký
                                                    </button>
                                                </div>

                                                <div className="text-center text-muted mt-3 mb-2">
                                                    Bạn đã có tài khoản?
                                                    <Link to={"/login"} className="fw-bold ms-2"
                                                          style={{color: '#00B98EFF'}}>
                                                        <u>Đăng nhập</u>
                                                    </Link>
                                                </div>
                                            </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;