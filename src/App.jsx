import { useState } from 'react'

import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import { UserContextProvider } from './components/Context/UserContext';
import ProtectedRout from './components/ProtectedRout/ProtectedRout';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Categoriesdetails from './components/Categoriesdetails/Categoriesdetails';
import CartContextProvider from './components/Context/CartContext';
import { Toaster } from 'react-hot-toast';
import UserAdress from './components/UserAdress/UserAdress';








let query = new QueryClient()

let router = createBrowserRouter([
  {path:'' , element:<Layout/> , children:[
    {index:true , element:<ProtectedRout><Home/></ProtectedRout>},
    {path:'products' , element:<ProtectedRout><Products/></ProtectedRout>},
    {path:'productdetails/:id/:category' , element:<ProtectedRout><ProductDetails/></ProtectedRout>},
    {path:'cart' , element:<ProtectedRout><Cart/></ProtectedRout>},
    {path:'brands' , element:<ProtectedRout><Brands/></ProtectedRout>},
    {path:'categories' , element:<ProtectedRout><Categories/></ProtectedRout>},
    {path:'address' , element:<ProtectedRout><UserAdress/></ProtectedRout>},
    {path:'Categoriesdetails/:id/:category' , element:<ProtectedRout><Categoriesdetails/></ProtectedRout>},
    {path:'login' , element:<Login/>},
    {path:'register' , element:<Register/>},
    {path:'*' , element:<Notfound/>},
  ]}
])
function App() {
  const [count, setCount] = useState(0)


  return <>
  
    <CartContextProvider>
      <QueryClientProvider client={query}>
          <UserContextProvider> 
            <Toaster/>
            <RouterProvider router={router}>
            </RouterProvider>
          <ReactQueryDevtools initialIsOpen={true}/>
          </UserContextProvider>
        </QueryClientProvider>
      </CartContextProvider>
 
      </>
  
}

export default App
