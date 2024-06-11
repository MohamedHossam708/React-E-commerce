import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useGeneralproducts() {
 // getting products
 function getRecentProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)}
      // distructing the data and the states
  let GeneralData = useQuery({
    queryKey:["recentProducts"],
    queryFn:getRecentProducts,
  })

  return GeneralData
}





