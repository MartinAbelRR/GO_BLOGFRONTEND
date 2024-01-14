import {  Navigate, Outlet } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../../store";

export const PrivateRouter = () => {
    const { isAuth } = useAuthStore();    

  return (
    isAuth ? <>
      <Toaster/>      
      <Outlet/>           
    </>
    : <Navigate to={'GO_BLOGFRONTEND/login'} />
  )
}
