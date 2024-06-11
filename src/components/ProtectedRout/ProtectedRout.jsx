import React, { useEffect, useState } from 'react';
import Style from './ProtectedRout.module.css';
import { Navigate } from 'react-router-dom';


export default function ProtectedRout(props) {
   
    if(localStorage.getItem('userToken')!==null){

      return props.children

    }else{

      return <Navigate to={'/login'}/>
    }

   

  
}
