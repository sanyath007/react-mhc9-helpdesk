import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import { login, resetSuccess } from '../../features/slices/auth/authSlice'

const loginSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { success, loading } = useSelector(state => state.auth);

    useEffect(() => {
        if (success) {
            dispatch(resetSuccess());

            navigate('/');
        }
    }, [success])

    const handleSubmit = (values, props) => {
        dispatch(login({ ...values }));

        props.resetForm();
    }

    return (
        <div className="bg-gray-200">
            <div className="container flex flex-col justify-center items-center min-h-[100vh]">
                <div className="login-box flex flex-col justify-center items-center bg-white border rounded-md py-10 w-1/2 max-[767px]:w-full min-lg:w-4/12 min-[1285px]:w-4/12">
                    <h2 className="text-xl">ระบบ <b>MHC9</b> ERP</h2>
                    <Formik
                        initialValues={{
                            email: 'sanyath007@gmail.com',
                            password: '4621008811'
                        }}
                        validationSchema={loginSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <div>
                                        <div className="flex max-sm:flex-col gap-2 justify-center items-center my-4">
                                            <label className="w-3/12 max-sm:w-full max-sm:hidden">ชื่อผู้ใช้ :</label>
                                            <div className="border px-4 py-2 rounded-full w-3/4 max-sm:w-full">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    placeholder="Email"
                                                    className="outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex max-sm:flex-col gap-2 justify-center items-center my-4">
                                            <label className="w-3/12 max-sm:w-full max-sm:hidden">รหัสผ่าน :</label>
                                            <div className="border px-4 py-2 rounded-full w-3/4 max-sm:w-full">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={formik.values.password}
                                                    onChange={formik.handleChange}
                                                    placeholder="Password"
                                                    className="outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex max-sm:flex-col gap-1 justify-center items-center">
                                            <label className="w-3/12 max-sm:w-full max-sm:hidden"></label>
                                            <div className="w-3/4 max-sm:w-full flex justify-between items-center">
                                                <button
                                                    type="submit"
                                                    className="bg-green-600 rounded-full px-4 py-2 text-white hover:bg-green-900"
                                                    disabled={formik.isSubmitting}
                                                >
                                                    {loading && (
                                                        <Spinner animation="border" role="status" size="sm" style={{ marginRight: '2px' }}>
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                    )}
                                                    ล็อกอิน <i className="fas fa-sign-in-alt"></i>
                                                </button>
                                                <Link to="/register" className="hover:text-blue-500 mr-1">
                                                    <i className="fas fa-user-plus"></i> ลงทะเบียน
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                            </Form>
                        )
                    }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Login