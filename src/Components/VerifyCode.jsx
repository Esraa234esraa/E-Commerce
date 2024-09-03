import React, { useState, useContext } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { authContext } from '../Context/AuthContext';
import { jwtDecode } from 'jwt-decode';

export default function VerifyCode() {
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);
    let [success, setSuccess] = useState(null);
    let navigate = useNavigate();

    async function handleVerifyCode(values) {
        setLoading(true);
        try {
            let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);

            // setSuccess(true);

            if (response.data.status === 'Success') {
                navigate('/createnewpassword');
                setError(null);
                setLoading(false);
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
        resetCode: Yup.string()
            .matches(/^\d{6}$/, 'Invalid Code') // تحقق من أن الكود يتكون من 6 أرقام
            .required('Code is required'), // تحقق من أن الحقل مطلوب
    });


    let formik = useFormik({
        initialValues: {
            resetCode: '',

        },
        validationSchema: validationSchema,
        onSubmit: handleVerifyCode
    });

    return (
        <>
            <h2 className='my-3 text-3xl'>Verify Code</h2>
            {error && <div className="text-red-500 bg-red-100 p-3 border rounded-lg mb-9">{error}</div>}
            <div className="text-green-500 bg-green-100 rounded-lg mt-4 border p-3 ">  A confirmation message has been sent to your email to retrieve the password </div> {/* Success message */}

            <form className="max-w-md mx-auto mt-[4rem]" onSubmit={formik.handleSubmit}>

                {/* resetCode input */}
                <div className="relative z-0 w-full mb-10 group">
                    <input
                        type="text"
                        name="resetCode"
                        id="floating_resetCode"
                        onBlur={formik.handleBlur}
                        value={formik.values.resetCode}
                        onChange={formik.handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label htmlFor="floating_resetCode" className="peer-focus:font-medium mb-6  absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600">resetCode</label>
                    {formik.errors.resetCode && formik.touched.resetCode ? (
                        <div className="text-red-500">{formik.errors.resetCode}</div>
                    ) : null}
                </div>



                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={loading}>
                    {loading ? 'Sending...' : 'Submit'}

                </button>
                {success && (<div className="text-green-500 bg-green-100 rounded-lg mt-4 border p-3 ">  A confirmation message has been sent to your resetCode to retrieve the password </div>)} {/* Success message */}

            </form>

            <div className='gap-3 mt-5 flex  justify-center items-center '>
                <span className='w-[20px] h-[20px] flex items-center border border-gray-500 justify-center rounded-full'><i className='fas fa-info text-[10px]'></i></span>
                <p className='cursor-pointer   text-green-400 text-lg '>dont have account?
                    <Link className='pl-2 text-sm md:text-lg font-bold hover:bg-green-400 border border-2 rounded-lg p-2  hover:text-white' to={'/register'} >Register Now</Link></p >
            </div>
            <div className='text-center mt-5'>
                <span className='pr-4'><i className='fa fa-backward'></i></span>
                <Link to={'/forgetpassword'}>Back</Link>
            </div>


        </>
    );
}
