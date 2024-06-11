import React, { useContext, useEffect, useState } from 'react';
import Style from './Navbar.module.css';
import logo from '../../assets/images/logo.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import { UserContext } from '../Context/UserContext';
useNavigate

export default function Navbar() {
  const [menu, setmenu] = useState(false)
 let navigate=useNavigate()

let {UserLogin , setUserLogin }=useContext(UserContext)

    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);


    function logOut(){
      localStorage.removeItem('userToken'), 
      setUserLogin(null),
      navigate('/Login')
    }
  return <>
   <nav className='bg-gray-200  fixed lg:sticky top-0 left-0 right-0 z-50 nav '>
    <div className="container items-center flex justify-between mx-auto py-4">
    <motion.div
    initial={{x:-700}}
    animate={{x:0}}
    transition={{duration:2}}
    className='flex flex-col lg:flex-row text-center '>
        <img src={logo} width={150} alt="fresh cart logo " />
        <ul className='lg:flex flex-col lg:flex-row lg:justify-around m-0 pl-10 hidden '>
          {/* if user signed in ot not  */}
        {UserLogin!==null?<> <li className='text-md xl:mx-2 py-2  text-slate-900 font-normal '><NavLink to={'/'}> Home </NavLink></li>
          <li className='text-md lg:mx-2 py-2 text-slate-900 font-normal '><NavLink to={'/cart'}> Cart </NavLink></li>
          <li className='text-md lg:mx-2 py-2 text-slate-900 font-normal '><NavLink to={'/categories'}> Categories </NavLink></li>
          <li className='text-md lg:mx-2 py-2 text-slate-900 font-normal '><NavLink to={'/brands'}> Brands </NavLink></li>
          <li className='text-md lg:mx-2 py-2 text-slate-900 font-normal '><NavLink to={'/products'}> Products </NavLink></li></>:null}
         
        </ul>
      </motion.div>

      <motion.ul
      initial={{x:500}}
      animate={{x:0}}
      transition={{duration:1.5}}
       className='lg:flex flex-col lg:flex-row justify-around m-0 pl-10 hidden'>
        {UserLogin===null?<>
          <li className='text-md xl:mx-2 py-2 text-slate-900 font-normal '><NavLink to={'/login'}> Login </NavLink></li>
          <li className='text-md xl:mx-2 py-2 text-slate-900 font-normal '><NavLink to={'/register'}> Register </NavLink></li></>
          :<li onClick={logOut}className='text-md xl:mx-2 py-2 text-slate-900 font-normal cursor-pointer '> Logout </li>
        }
          <li className='text-md xl:mx-2 py-2 text-slate-900 font-normal  items-center flex justify-between '>
            <i className='fab fa-facebook mx-2 fa-sm'></i>
            <i className='fab fa-twitter mx-2 fa-sm'></i>
            <i className='fab fa-instagram mx-2 fa-sm'></i>
            <i className='fab fa-tiktok mx-2 fa-sm'></i>
            <i className='fab fa-youtube mx-2 fa-sm'></i>
          </li>
        </motion.ul>
        <button onClick={()=>setmenu(!menu)} className=' menue cursor-pointer sm:visible lg:hidden absolute right-16 '><i className="fa-solid fa-bars fa-2xl "></i></button>
        {menu==true?
          <motion.div
         
        >
              <ul className='lg:flex flex-col justify-center items-center m-0 p-5 border   rounded-2xl absolute right-4 top-16 bg-emerald-100  '>
                {/* if user signed in ot not  */}
              {UserLogin!==null?<> <li className='text-md  py-2  text-slate-900 font-normal '><NavLink to={'/'}> Home </NavLink></li>
                <li className='text-md lg:mx-2  py-2 text-slate-900 font-normal '><NavLink to={'/cart'}> Cart </NavLink></li>
                <li className='text-md lg:mx-2 py-2 text-slate-900 font-normal '><NavLink to={'/categories'}> Categories </NavLink></li>
                <li className='text-md lg:mx-2 py-2 text-slate-900 font-normal '><NavLink to={'/brands'}> Brands </NavLink></li>
                <li className='text-md lg:mx-2 py-2 text-slate-900 font-normal '><NavLink to={'/products'}> Products </NavLink></li></>:null}
               
              </ul>
            </motion.div>
        :null}
    </div>


  </nav> 

  






 </>
}
