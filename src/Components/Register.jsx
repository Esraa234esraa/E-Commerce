import React, { useContext, useState } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom'
import { authContext } from '../Context/AuthContext';
import { jwtDecode } from "jwt-decode";




export default function Register() {
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [success, setSuccess] = useState(null);
  let navigate = useNavigate();
  let { setIsAuthenticated } = useContext(authContext);

  async function handleRegister(values) {
    setLoading(true);
    try {
      let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      console.log('Registration successful:', response.data);
      setSuccess(true);
      setError(null);
      setLoading(false);
      localStorage.setItem('userToken', response.data.token);
      navigate('/');
      setIsAuthenticated(jwtDecode(response.data.token))


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
    name: Yup.string()
      .min(2, 'Minimum length is 2 characters')
      .max(10, 'Maximum length is 10 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{5,10}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Re-enter password is required'),
    phone: Yup.string()
      .matches(/^01[0-2][0-9]{8}$/, 'Phone number must be valid and in the format of 01012345678')
      .required('Phone number is required')
  });

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister
  });

  return (
    <>
      <h2 className='my-3 text-3xl'>Register Now</h2>
      {error && <div className="text-red-500 bg-red-100 p-3 border rounded-lg mb-4">{error}</div>}

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        {/* Name input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            onBlur={formik.handleBlur}
            id="floating_name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-950 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600">First name</label>
          {formik.errors.name && formik.touched.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>
        {/* Email input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="floating_email"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600">Email address</label>
          {formik.errors.email && formik.touched.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>
        {/* Password input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            onBlur={formik.handleBlur}
            id="floating_password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600">Password</label>
          {formik.errors.password && formik.touched.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>
        {/* Repeat Password input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            id="floating_rePassword"
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="floating_rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600">Repeat Password</label>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="text-red-500">{formik.errors.rePassword}</div>
          ) : null}
        </div>
        {/* Phone number input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="floating_phone"
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600">Phone number</label>
          {formik.errors.phone && formik.touched.phone ? (
            <div className="text-red-500">{formik.errors.phone}</div>
          ) : null}
        </div>
        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={loading}>
          {loading ? 'Registering...' : 'Submit'}

        </button>
        {success && (<div className="text-green-500 bg-green-100 rounded-lg mt-4 border p-3 ">  The account has been created successfully</div>)} {/* Success message */}

      </form>
    </>
  );
}
