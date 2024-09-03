import React from 'react'
import logo from '../assets/finalProject assets/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useContext } from 'react';
import { authContext } from '../Context/AuthContext';
import useQueryCard from '../Hokes/useQueryCard';
import { getCartApi } from '../APIS/cartApis';


export default function Navbar() {
  const { isError, data, error } = useQueryCard("getcart", getCartApi);


  let [open, setOpen] = useState(false);
  let { isAuthenticated, setIsAuthenticated } = useContext(authContext);
  let navigate = useNavigate()
  function toggle() {
    setOpen(!open)
  }
  function logout() {
    localStorage.removeItem('userToken');
    setIsAuthenticated(null);
    navigate('/login');
  }
  return (
    <>
      <nav className='py-4 bg-gray-100'>
        <div className="container lg:flex justify-between  items-center ">
          <div className="logo lg:flex gap-1">
            <NavLink to={'/'}><img src={logo} width={130} alt="logo" /></NavLink>
            {isAuthenticated ? <ul className={`mt-4 md:mt-0 md:ml-6 lg:flex gap-4 ${open ? '' : 'hidden'}`}>
              <li>              <NavLink to={'/'}>Home</NavLink>
              </li>
              <li>              <NavLink to={'/displayproducts'}>Products</NavLink>
              </li>
              <li>              <NavLink to={'/brand'}>Brand</NavLink>
              </li>

              <li>              <NavLink to={'/products'}>Categories</NavLink>
              </li>
              <li>              <NavLink to={'/wishlist'}>Whish List <span><i className='fa fa-heart ml-1 text-red-700'></i></span></NavLink>
              </li>

            </ul> : ''}

          </div>

          <div>

            <ul className={`lg:flex gap-4 ${open ? '' : 'hidden'}`}>
              <li className='mt-5 md:mt-0 '>           <NavLink to={'/cart'}><i className='fa fa-cart-shopping'></i> <span className='bg-green-600 text-white px-2 py-[.2rem] border rounded-full'>{data?.numOfCartItems}</span>  </NavLink>
              </li>
              {isAuthenticated ? <> <li className='text-red-600 font-bold cursor-pointer ' onClick={logout} >Logout </li> {isAuthenticated ? <b className='text-green-700'>hi ,{isAuthenticated.name}</b> : ''} <li className='flex gap-3'>
                <a href=""><i className='fab fa-facebook'></i></a>
                <a href=""><i className='fab fa-twitter'></i></a>
                <a href=""><i className='fab fa-google'></i></a>
                <a href=""><i className='fab fa-instagram'></i></a>

              </li>
              </> : <>  <li>              <NavLink className={'cursor-pointer'} to={'/login'}>Login </NavLink>
              </li>
                <li>              <NavLink className={'cursor-pointer'} to={'/register'}>Register</NavLink>
                </li>

              </>}
            </ul>
          </div>
          <i
            onClick={toggle}
            className={`md:hidden ${!open ? 'fa-bars' : 'fa-close'} fas fa-2x mt-4 absolute top-2 right-3 cursor-pointer`}
          ></i>        </div>
      </nav>
    </>
  )
}
