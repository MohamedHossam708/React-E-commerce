import React, { useEffect, useState } from 'react';
import Style from './Categories.module.css';
import useGeneralcategories from '../Hooks/useGeneralCategories';
import { SkewLoader } from 'react-spinners';
import { Link } from 'react-router-dom';


export default function Categories() {


  let {data , isLoading , error , isError} = useGeneralcategories()


  
  if(isLoading)
    {
      return <>
      <div className='w-full flex justify-center mt-10'>
      <SkewLoader
      color="#e01616"
      size={50}
      speedMultiplier={1}
    /></div></>
    }



 // incase of sucess
 return <>
 <div className="row">
{/* looping on categoriess */}
  {data?.data?.data.map((categories)=><div key={categories._id} className=" sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 mt-4 px-4 categories  ">
   
   
    {/* putting every categories in link to be able to acsess it */}
    <Link to={`/Categoriesdetails/${categories._id}/${categories.name}`}> 


  {/* categories image cover */}
  <div className="max-w-sm bg-white border rounded-lg shadow dark:bg-emerald-800 dark:border-emerald-700  hover:shadow-xl  hover:shadow-emerald-300 hover:scale-110 hover:duration-1000 h-[250px]  " >
      <img className="rounded-t-lg w-full h-[200px] " src={categories.image} alt={categories.title} />


  {/* categories informations */}

  <div className="d-flex content-center items-center h-[50px]  rounded"> 
    <p className="mb-2  text-xl font-bold tracking-tight text-emerald-700 w-full text-center">{categories.name}</p> 
   </div>
 
  
</div>
</Link>
  </div>)}

  


 </div>
</>
  

}
