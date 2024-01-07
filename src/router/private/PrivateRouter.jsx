import {  Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from "../../store/auth";
import { Toaster } from "react-hot-toast";

export const PrivateRouter = () => {
    const { isAuth } = useAuthStore();    

  return (
    isAuth ? <>
      <Toaster/>  
      <Outlet/>     
    </>
    : <Navigate to={'/login'} 
    />
  )
}
