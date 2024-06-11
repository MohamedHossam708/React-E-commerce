import React, { useEffect, useState } from 'react';
import Style from './Footer.module.css';
import logo from '../../assets/images/logo.svg'


export default function Footer() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
    <div className="footer  bottom-0 left-0 right-0 z-50 h-[150px] rounded w-full bg-gray-200 shadow-xl flex-col flex items-center content-center">.
      <img className='p-5' src={logo} width={300} alt="FreshCart" />
      <h5>Copyright © 2024 all rights reserved</h5>
    </div>
  </>
}
