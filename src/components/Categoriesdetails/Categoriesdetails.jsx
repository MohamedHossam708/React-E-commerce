import React, { useEffect, useState } from 'react';
import Style from './Categoriesdetails.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { SkewLoader } from 'react-spinners';


export default function Categoriesdetails() {
  
let[CategoryDetails , setCategoryDetails]=useState(null)
let[RelatedProduct , setRelatedProduct]=useState([])

  let {id , category }=useParams();


// getting one category data
 function getCategoryDetails(id){
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  .then((data)=>{
    setCategoryDetails(data.data.data)})
  .catch((error)=>{console.log(error)})
}

// getting realted proucts
function getRealtedProducts(category){
  axios.get('https://ecommerce.routemisr.com/api/v1/products')
  .then((data)=>{
    let allProducts= data.data.data
   let related=allProducts.filter((product)=>product.category.name == category)
  setRelatedProduct(related) 
  console.log(related)
  })
  .catch((error)=>{console.log(error)})

}



useEffect(()=>{
  getCategoryDetails(id)
  getRealtedProducts(category)

},[])

  return <>
  {CategoryDetails==null?<div className='w-full flex justify-center mt-10'>
    <SkewLoader
    color="#e01616"
    size={50}
    speedMultiplier={1}
  /></div>:<div className="w-full h-full p-3 flex shadow-xl ">
  {/* img part */}
  <div className="img w-1/4">
    <img className='w-full' src={CategoryDetails?.image} alt={CategoryDetails?.name} />
  </div>
  {/* Data part and the realted product */}
  <div className=" data w-3/4  ">
    {/* Title of Chosen category */}
    <h1 className='font-bold text-2xl text-slate-700 text-center'>Chosen Category: <span className='text-2xl text-emerald-800 text-center'>{CategoryDetails?.name}</span></h1>

    {/* showing the related products */}
    <div className="row">
{/* looping on products */}
  {RelatedProduct?.map((product)=><div key={product.id} className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mt-4 px-4 product py-3 ">
   
   
    {/* putting every product in link to be able to acsess it */}
    <Link to={`/productdetails/${product.id}/${product.category.name}`}> 


  {/* product image cover */}
  <div className="max-w-sm bg-white border rounded-lg shadow dark:bg-emerald-800 dark:border-emerald-700  hover:shadow-xl  hover:shadow-emerald-300 hover:scale-110 hover:duration-1000">
      <img className="rounded-t-lg w-full h-[200px] " src={product.imageCover} alt={product.title} />
  <div className="p-2"> 
  
  {/* Product informations */}
    <span className="mb-2 text-2xl font-bold tracking-tight text-emerald-700 dark:text-white">{product.title.split(' ').slice(0,2).join(' ')}</span>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.category.name}</p>  
    <div className="flex justify-between items-center">
      <span className='text-emerald-600'>{product.price} <span className='text-gray-900 font-semibold'> EGP</span></span>
      <span>{product.ratingsAverage}<i className='fas fa-star text-yellow-500'></i></span>
    </div>
  </div>
  <button className='btn '>Add To Cart</button>
  
</div>
</Link>
  </div>)}

  


 </div>
  </div>
</div>}
  
  

  </>
}
