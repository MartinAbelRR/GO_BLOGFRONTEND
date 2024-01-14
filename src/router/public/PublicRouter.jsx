import {  Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store';


export const PublicRouter = () => {
  const { isAuth } = useAuthStore();    

  return (
    isAuth ? <Navigate to={'GO_BLOGFRONTEND/'} /> : <Outlet />
  )
}
