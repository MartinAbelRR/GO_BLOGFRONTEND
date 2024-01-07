import {  Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from "../../store/auth";

export const PublicRouter = () => {
  const { isAuth } = useAuthStore();    

  return (
    isAuth ? <Navigate to={'/myhome'} /> : <Outlet />
  )
}
