import React, { useEffect, useState } from 'react';
import Style from './MainSlider.module.css';
import mainSliderimg from"../../assets/images/slider-image-1.jpeg"
import mainSliderimg1 from"../../assets/images/slider-image-2.jpeg"
import mainSliderimg2 from"../../assets/images/slider-image-3.jpeg"
import mainSliderimg3 from"../../assets/images/slider-2.jpeg"
import mainSliderimg4 from"../../assets/images/grocery-banner-2.jpeg"
import Slider from "react-slick";


export default function MainSlider() {

  const settings = {
    arrows:false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1500
   

  }

    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
  <div className="row">
    <div className="w-3/4">
    <Slider {...settings}>
        <div>
        <img className='w-full h-[400px]' src={mainSliderimg} alt="" />       
         </div>
        <div>
        <img className='w-full h-[400px]' src={mainSliderimg3} alt="" />
        </div>
        <div>
        <img className='w-full h-[400px]' src={mainSliderimg4} alt="" />
        </div>
        </Slider>
     
    </div>
    <div className="w-1/4 ">
        <div>
          <img className='h-[200px] w-full' src={mainSliderimg1} alt="" />
        </div>
        <div>
          <img className='h-[200px] w-full' src={mainSliderimg2} alt="" />
        </div>
      

    </div>
   
  </div> 
  </>
}