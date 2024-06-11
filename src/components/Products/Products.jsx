import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {  useQuery } from '@tanstack/react-query';
import {SkewLoader} from "react-spinners"
import useGeneralproducts from '../Hooks/useGeneralProducts';


export default function RecetnProducts() {

 
    // distructing the data and the states
let {data , isLoading , error , isError} = useGeneralproducts()



// loading Spinner
if(isLoading)
  {
    return <>
    <div className='w-full flex justify-center mt-8'>
    <SkewLoader
    color="#e01616"
    size={50}
    speedMultiplier={1}
  /></div></>
  }
  
  // incase of sucess
  return <>
   <div className="row">
{/* looping on products */}
    {data?.data?.data.map((product)=><div key={product.id} className="sm:w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 mt-4 px-4 product ">
     
     
      {/* putting every product in link to be able to acsess it */}
      <Link to={`/productdetails/${product.id}/${product.category.name}`}> 


    {/* product image cover */}
    <div className="max-w-sm bg-white border rounded-lg shadow  hover:shadow-xl  hover:shadow-emerald-300 hover:scale-110 hover:duration-1000">
        <img className="rounded-t-lg w-full " src={product.imageCover} alt={product.title} />
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
  </>
}
