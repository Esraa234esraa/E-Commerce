import React, { useState, useContext } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { authContext } from '../Context/AuthContext';
import { jwtDecode } from 'jwt-decode';

export default function CreateNewPassword() {
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);
    let [success, setSuccess] = useState(null);
    let navigate = useNavigate();
    let { setIsAuthenticated } = useContext(authContext);

    async function handleNewPassword(values) {
        setLoading(true);
        try {
            let response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
            console.log(response.data);
            if (response.data.token) {
                setSuccess(true);
                setError(null);
                setLoading(false);
                navigate('/login');
            }



        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
                setSuccess(false);
            } else {
                setError('An error occurred during registration. Please try again.');
            }
            setSuccess(false);

            setLoading(false);
        }
    }

    let validationSchema = Yup.object({

        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        newPassword: Yup.string()
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{5,10}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
            .required('Password is required'),

    });

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',

        },
        validationSchema: validationSchema,
        onSubmit: handleNewPassword
    });

    return (
        <>
            <h2 className='my-3 text-3xl'>create New  Password</h2>
            {error && <div className="text-red-500 bg-red-100 p-3 border rounded-lg mb-9">{error}</div>}

            <form className="max-w-md mx-auto mt-[4rem]" onSubmit={formik.handleSubmit}>

                {/* Email input */}
                <div className="relative z-0 w-full mb-10 group">
                    <input
                        type="email"
                        name="email"
                        id="floating_email"
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label htmlFor="floating_email" className="peer-focus:font-medium mb-6 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600">Email address</label>
                    {formik.errors.email && formik.touched.email ? (
                        <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                </div>
                {/* Password input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        name="newPassword"
                        onBlur={formik.handleBlur}
                        id="floating_newPassword"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label htmlFor="floating_newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600">New Password</label>
                    {formik.errors.newPassword && formik.touched.newPassword ? (
                        <div className="text-red-500">{formik.errors.newPassword}</div>
                    ) : null}
                </div>


                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={loading}>
                    {loading ? 'Logining...' : 'Submit'}

                </button>
                {success && (<div className="text-green-500 bg-green-100 rounded-lg mt-4 border p-3 ">  The Password changed successfuly</div>)} {/* Success message */}
                <div className='text-center mt-5'>
                    <span className='pr-4'><i className='fa fa-backward'></i></span>
                    <Link to={'/verifycode'}>Back</Link>
                </div>
            </form>


        </>
    );
}
