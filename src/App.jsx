import React, { lazy, Suspense } from 'react'
import * as ReactDOM from "react-dom";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from './Components/Layout';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Brand from './Components/Brand';
import Notfound from './Components/Notfound';
import ProtectedRoute from './Components/ProtectedRoute';
import ForgetPassword from './Components/ForgetPassword';
import VerifyCode from './Components/VerifyCode';
import CreateNewPassword from './Components/CreateNewPassword';
import DisplayProducts from './Components/DisplayProducts';
import Orders from './Components/Orders';
import Loading from './Components/Loading';
import WishList from './Components/WishList';
import Products from './Components/Products';
export default function App() {
  const ProductDetails = lazy(() => import('./Components/ProductDetails'));
  const Cart = lazy(() => import('./Components/Cart'));
  const BrandDetails = lazy(() => import('./Components/BrandDetails'));


  const routers = createHashRouter([{
    path: '/', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /> </ProtectedRoute> },
      {
        path: 'login', element: <Login />
      },
      { path: 'register', element: <Register /> },
      { path: 'forgetpassword', element: <ForgetPassword /> },
      { path: 'verifycode', element: <VerifyCode /> },
      { path: 'createnewpassword', element: <CreateNewPassword /> },
      { path: 'productdetails/:id/:categoryId', element: <ProtectedRoute>  <Suspense fallback={<Loading />}><ProductDetails /></Suspense></ProtectedRoute> },
      { path: 'branddetails/:id', element: <ProtectedRoute>  <Suspense fallback={<Loading />}><BrandDetails /></Suspense></ProtectedRoute> },

      { path: 'products', element: <ProtectedRoute>   <Products /> </ProtectedRoute > },
      { path: 'displayproducts', element: <ProtectedRoute> <DisplayProducts /></ProtectedRoute> },
      { path: '/allorders', element: <ProtectedRoute> <Orders /></ProtectedRoute> },

      { path: 'cart', element: <ProtectedRoute>  <Suspense fallback={<Loading />}><Cart /></Suspense> </ProtectedRoute> },
      { path: 'brand', element: <ProtectedRoute> <Brand /> </ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute> <WishList /> </ProtectedRoute> },

      { path: '*', element: <Notfound /> },

    ]
  }])
  return (
    <RouterProvider router={routers}></RouterProvider>
  )
}
