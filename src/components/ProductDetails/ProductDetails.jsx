import React, { useContext, useEffect, useState } from 'react';
import Style from './ProductDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query';
import { cartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';




export default function ProductDetails() {

  let {addToCart}= useContext(cartContext)

  async function addProductToCart(productId){
    let res =await addToCart(productId)
    if(res.data.status ==="success"){
      toast.success(res.data.message)
       }
    else{
      toast.error(res.data.message)
    }
  }

// Controlling selected product slider
  const SingleProductsettings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false
  }
// Controlling related products slider
  const RelatedProudctssettings = {
  
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  }


  let {id , category}=useParams()
  // state for selected product
const [productdetails, setproductdetails] = useState(null)

// state for realted products
const [RelatedProduct ,setRelatedProduct ]=useState([])




//  getting selected product 
   function getSinglePoroduct(id){
     axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data})=>{
      setproductdetails(data.data)})
    .catch((error)=>{console.log(error)})}
    
// getting related products 
    function getRelatedPoroducts(category){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({data})=>{
        let allProducts = data.data
        let RelatedProducs= allProducts.filter((product)=>product.category.name==category)
       setRelatedProduct(RelatedProducs)
      })
      .catch((error)=>{console.log(error)})
    }


    useEffect(()=>{
      
      getSinglePoroduct(id)
      getRelatedPoroducts(category)
    } , [id,category]);

    

  return <>
  
  {/* single product  */}
   <div className="row  mt-8 shadow-xl  hover:shadow-emerald-300  hover:duration-1000 drop-shadow-sm">
    {/* single product img */}
    <div className="md:w-1/2  xl:w-1/4 ">

    <div className="slider-container">
      <Slider {...SingleProductsettings}>
        {productdetails?.images.map((src)=><img className="sm:w-1/4  md:w-full"src={src} key={productdetails.id} alt={productdetails?.title} />)}
      </Slider>
    </div>
    </div>
    {/* single product info */}
      <div className="md:w-1/2 xl:w-3/4  p-6 ">
      <h1 className='text-lg  font-semibold text-emerald-800'>{productdetails?.title}</h1>
      <p className='text-gray-700 mt-4 font-light'>{productdetails?.description}</p>
      <div className="flex justify-between">
      <p className='text-gray-700 mt-4 font-light'>How many time sold this product? <span className='text-emerald-700 font-semibold'>{productdetails?.sold}</span>  </p>
      <p className='text-gray-700 mt-4 font-light'>Avalible in Stock : {productdetails?.quantity}</p>
      
      </div>
     
      <div className="flex mt-4 mb-4 justify-between items-center">
        <span className='text-emerald-600'>{productdetails?.price} <span className='text-gray-900 font-semibold'> EGP</span></span>
        <span>{productdetails?.ratingsAverage}<i className='fas fa-star text-yellow-500'></i></span>
      </div>
  
    <button className='btn ' onClick={()=>addProductToCart(productdetails.id)}>Add To Cart</button>
    
      </div>
    </div>
   {/* end of single product */}




{/* realted products  */}
   
    
    <div className="container flex flex-col w-full  ">
<h2 className='mx-auto text-emerald-900 font-bold text-3xl mt-8 '>Realted To Your Search</h2>
    <Slider {...RelatedProudctssettings}>
    
      {RelatedProduct.map((product)=><div key={product.id} className="w-full border-b-green-500 px-7 py-7 product  ">
    {/* putting every product in link to be able to acsess it */}
    <Link to={`/productdetails/${product.id}/${product.category.name}`}> 
  {/* product image cover */}
  <div className="max-w-sm bg-white border rounded-lg shadow  hover:shadow-xl  hover:shadow-emerald-300 hover:scale-110 hover:duration-500">
      <img className="  rounded-t-lg w-full" src={product.imageCover} alt={product.title} />
  <div className="p-2"> 
  {/* Product informations */}
    <span className="lg:text-xl xl:text-2xl font-bold tracking-tight text-emerald-700 dark:text-white">{product.title.split(' ').slice(0,2).join(' ')}</span>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.category.name}</p>  
    <div className="flex justify-between items-center">
      <span className='text-emerald-600'>{product.price} <span className='text-gray-900 font-semibold'> EGP</span></span>
      <span>{product.ratingsAverage}<i className='fas fa-star text-yellow-500'></i></span>
    </div>
  </div>
  <button className='btn ' onClick={()=>addProductToCart(product.id)}>Add To Cart</button>
  
</div>
  </Link>
  </div>)}
      
      
    </Slider>
  
  
  
    </div>

  </>
}
