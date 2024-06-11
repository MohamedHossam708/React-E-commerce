import axios from "axios"
import { createContext, useEffect, useState } from "react"





export let cartContext = createContext( )


export default function CartContextProvider(props){

const[CartID , setCartID]=useState(null)

let headers={
    token:localStorage.getItem('userToken')
}

function getCartItems(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
        headers
    })
    .then((res)=>res)
    .catch((error)=>error)
}

function addToCart(productId){
  return  axios.post('https://ecommerce.routemisr.com/api/v1/cart',{ productId},{ headers})
    .then((res)=>res)
    .catch((err)=>err)

}

function removeCartItems(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
    .then((res)=>res)
    .catch((err)=>err)
}

function updateCartItems(productId , count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        count
    },{
        headers
    })
    .then((res)=>res)
    .catch((err)=>err)
  
}

function onlinePayment(  values){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}?url=http://localhost:5173`,{
        shippingAddress:values
    },{
        headers
    })
    .then((res)=>res)
    .catch((err)=>err)
  
}

function DeleteCartItems(){
        return  axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{ headers})
          .then((res)=>res)
          .catch((err)=>err)
      
      }




 async function getCartId(){
const{data}= await getCartItems()
setCartID(data?.data._id)
console.log(data?.data);

 }

 useEffect(()=>{getCartId()},[])
 
    return<cartContext.Provider value={{addToCart , getCartItems , removeCartItems , updateCartItems , onlinePayment , DeleteCartItems}}>
        {props.children}
    </cartContext.Provider>
}