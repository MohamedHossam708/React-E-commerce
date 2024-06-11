import React, { useEffect, useState } from 'react';
import Style from './CategorySlider.module.css';
import Slider from "react-slick";
import axios from 'axios';



export default function CategorySlider() {


    const [Categories, setCategories] = useState([]);

    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 8,
      slidesToScroll: 3,
      autoplay: true,
      speed: 1500,
    autoplaySpeed: 1500,


    }

    function getCategories(){
      axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((data)=>{
        setCategories(data.data.data)  
      })
      .catch((error)=>{console.log(error)})
    }
    useEffect(()=>{
      getCategories()
    } , []);
  return <>
  <div className='p-5'>
    <h2 className='py-4 text-xl font-semibold text-emerald-950'> Shop popular Categpories</h2>
    
  {<Slider {...settings}>
    {Categories.map((category)=><div key={category._id}>
      <img   className='category-image w-full ' src={category.image} alt={category.name} />
      <h3 className=' text-emerald-950 font-semibold mt-2'>{category.name}</h3>
    </div> )}
  </Slider> }
  </div>
  </>
}
