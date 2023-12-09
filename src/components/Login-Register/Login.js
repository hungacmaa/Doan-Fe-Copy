import './login.scss'
import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import * as Yup from 'yup';
import Swal from "sweetalert2";
import {getAccountLogin} from "../../redux/reducer/accountSlice";


function Login() {
    const dispatch = useDispatch();
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate();
    return (
        <section className="bg-image">
            <div className="d-flex align-items-center h-100">
                <div className="container login-container">
                    <div className="row">
                        <div className="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
                            <div className="panel border bg-white py-3 px-2">
                                <div className="panel-heading">
                                    <h2 className="pt-3 text-uppercase">Đăng nhập</h2>
                                </div>
                                <div className="panel-body p-3">
                                    <Formik
                                        initialValues={{
                                            username: '',
                                            password: '',
                                        }}
                                        validationSchema={Yup.object().shape({
                                            username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
                                            password: Yup.string().required('Vui lòng nhập mật khẩu')
                                        })}
                                        onSubmit={values => {
                                            let account = {
                                                username: values.username,
                                                password: values.password
                                            }
                                            setLoginError('')
                                            axios.post("http://localhost:8080/login", account).then(resp => {
                                                dispatch(getAccountLogin(resp.data))
                                                localStorage.setItem('account', JSON.stringify(resp.data));
                                                Swal.fire({
                                                    title: 'Đăng nhập thành công !',
                                                    icon: 'success',
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                }).then();
                                                navigate('/');
                                            }).catch(err => {
                                                setLoginError(err.response.data);
                                            })
                                        }}>
                                        <Form>
                                            <div className="form-group py-2">
                                                <label className="form-label">Tên đăng nhập</label>
                                                <div className="input-field py-2">
                                                    <span className="far fa-user p-2"></span>
                                                    <Field type="text" id="username" name="username"
                                                           placeholder="Tên đăng nhập"/>
                                                </div>
                                                <ErrorMessage name="username" className="text-danger"
                                                              component="div"/>
                                            </div>
                                            <div className="form-group py-1 mt-2">
                                                <label className="form-label">Mật khẩu</label>
                                                <div className="input-field">
                                                    <span className="fas fa-lock px-2"></span>
                                                    <Field type={showPassword ? "text" : "password"} id="password"
                                                           name="password"
                                                           placeholder="Mật khẩu"/>
                                                    <button type="button" className="btn bg-white text-muted"
                                                            onClick={toggleShowPassword}>
                                                        <span className="far fa-eye-slash"></span>
                                                    </button>
                                                </div>
                                                <ErrorMessage name="password" className="text-danger"
                                                              component="div"/>
                                            </div>
                                            {loginError && <div className="text-danger">{loginError}</div>}
                                            <div className="form-inline my-3 text-center">
                                                <input type="checkbox" name="remember" id="remember"
                                                       checked={remember}
                                                       onChange={() => setRemember(!remember)}/>
                                                <label htmlFor="remember" className="text-muted">
                                                    Ghi nhớ đăng nhập
                                                </label>
                                                <Link to={"/forgot-password"} className="forgot ms-4">Quên mật
                                                    khẩu?</Link>
                                            </div>

                                            <div className="text-center mt-4">
                                                <button type="submit"
                                                        className="btn btn-success border-0 btn-login btn-lg">
                                                    Đăng nhập
                                                </button>
                                            </div>
                                            <div className="text-center pt-4 text-muted">
                                                Bạn chưa có tài khoản?
                                                <Link className="ms-2" to={"/register"}
                                                      style={{color: '#00B98EFF'}}>
                                                    <b>Đăng ký</b>
                                                </Link>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                                <div className="mx-3 my-2 py-2 bordert">
                                    <div className="text-center mt-3">
                                        <a href="https://wwww.facebook.com" className="px-2">
                                            <img
                                                src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg"
                                                alt=""/>
                                        </a>
                                        <a href="https://www.google.com" className="px-2">
                                            <img
                                                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                                                alt=""/>
                                        </a>

                                        <a href="https://www.github.com" className="px-2">
                                            <img
                                                src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png"
                                                alt=""/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;