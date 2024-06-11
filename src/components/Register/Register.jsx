import React, { useContext, useEffect, useState } from 'react';
import Style from './Register.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import* as Yup from 'yup'
import { UserContext } from '../Context/UserContext';






export default function Register() {

  let {setUserLogin} = useContext(UserContext)
// {For  spinner controlling }
  const [loading , setloading]=useState(false)
  // {To Show The error}
  const [apiError, setapiError] = useState("")


  // {Validiation}
let validationSchema=Yup.object().shape({
  name:Yup.string().min(3, "Name min length is 3").max(20,"name is too long max length is 10").required("Name is required"),
  email:Yup.string().email("email is invalid").required("Email is required"),
  phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"Phone number must be Egyptian number").required("Phone is required"),
  password:Yup.string().matches(/^[A-Z][A-z0-9]{5,10}$/,"Password must start with UpperCase and more than 5 letters ").required("Password is required"),
  rePassword:Yup.string().oneOf([Yup.ref('password'),"Repassword must matches password"]).required("rePassword must matches the Password "),
})


// {Programatic navigate}
let navigate=useNavigate()

// {Handling Resgister}
   function  handelRegister(info){

    // {to make spin and hiding the button}
  setloading(true)


  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,info).then((res)=>{setloading(false),localStorage.setItem('userToken',res.data.token),console.log("sucess"),setUserLogin(res.data.token),navigate('/')})
  // {incase of failur}
  .catch((apiResponse)=> {setapiError(apiResponse.response?.data.message),setloading(false) ,console.log(apiResponse)})
    
  }




let formik = useFormik({
  initialValues:{
    name:'',
    email:'',
    phone:'',
    password:'',
    rePassword:''
   
  },validationSchema,
  onSubmit:handelRegister
})



  return <>

  {/* Form Start */}

  <div className= "max-w-sm md:max-w-md lg:max-w-xl mx-auto py-20 ">
  <form onSubmit={formik.handleSubmit}>

{/* to show the response from the backend */}
  {apiError?<div className="p-4 my-5 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{apiError}</span> 
  </div>:null}

    <h2 className='font-bold text-2xl mb-6 text-emerald-700	'>Register Now</h2>
 
    {/* Name */}
  <div className="relative z-0 w-full mb-5 group">
      <input type="text"onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
  </div>
  {/* Name alert */}
  {formik.errors.name && formik.touched.name?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.name}.</span> 
</div>:null}
  {/* Email */}
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email address</label>
  </div>
    {/* Email alert */}
    {formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.email}.</span> 
</div>:null}

   {/* Phone */}
   <div className="relative z-0 w-full mb-5 group">
      <input type="tel" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone Number</label>
  </div>
    {/* Phone alert */}
    {formik.errors.phone && formik.touched.phone?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.phone}.</span> 
</div>:null}
  
  {/* password */}
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password </label>
  </div>
    {/* Password alert */}
    {formik.errors.password && formik.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.password}.</span> 
</div>:null}

  {/* rePassword */}
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter  Repassword </label>
  </div>
   {/* rePassword alert */}
   {formik.errors.rePassword && formik.touched.rePassword?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.rePassword}.</span> 
</div>:null}
{/* submit button and spinner condition */}
  <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">{loading==true?<i className='fa fa-spinner fa-spin'></i>:"Submit"}</button>

  </form>

  </div>
 

  </>
}
