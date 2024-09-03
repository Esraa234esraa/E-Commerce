import React, { useContext } from 'react'
import { authContext } from '../Context/AuthContext'
import Login from './Login'
import { Navigate } from 'react-router-dom'
export default function ProtectedRoute({ children }) {
    // let { setIsAuthenticated } = useContext(authContext);
    if (localStorage.getItem('userToken') !== null) {
        return children

    }
    else
        return <Navigate to={'/login'} ></Navigate >
}
